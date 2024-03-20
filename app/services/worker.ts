import { eventQueue } from "./bull";
import { formatHeaders } from "../utils/headers";
import { SubscriptionRepository } from "../modules/ingest/ingest.repository";
import IngestService from "../modules/ingest/ingest.service"
import ForwardService from "../modules/forward/forward.service";
import { EventDelivery, EventDeliveryStatus } from "@prisma/client";


eventQueue.process( async (eventTask) => {
    let eventData = eventTask.data

    if (eventData.type == "forward-event") {
        let payload = JSON.stringify(eventData.data.payload)
        // let headers = formatHeaders(eventData.data.sourceId, eventData.data.headers)

        let event = await IngestService.retrieveEvent(eventData.data.id)
        let subscription = await SubscriptionRepository.getOrCreate(event.sourceId)
        let headers = {
            ...eventData.data.headers,
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(payload, 'utf8').toString(),
            'User-Agent': "Hooks.io/1.0",
            'X-Hooks-Source-Id': eventData.data.sourceId,
            // 'X-Forwarded-For': headers.host,
            // 'X-Forwarded-Host': "forwardedHost",
        }
    
        // forward event
        subscription.endpoints.forEach( async (endpoint) => {
            
            // Create event delivery object
            let eventDelivery = await ForwardService.createEventDelivery({
                eventId: event.id,
                endpointId: endpoint.id,
            })
            
            
            try {
                await fetch(endpoint.url, {
                    method: "POST",
                    body: payload,
                    headers: headers
                    // headers
                })
                await ForwardService.updateEventDelivery( eventDelivery.id, {
                    status: EventDeliveryStatus.SUCCESSFUL
                })
            } catch(error) {
                console.log(error);
                
                await ForwardService.updateEventDelivery( eventDelivery.id, {
                    status: EventDeliveryStatus.FAILED
                })
            }
        });
    }
});