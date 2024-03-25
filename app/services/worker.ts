import { eventQueue } from "./bull";
import { formatHeaders } from "../utils/headers";
import { SubscriptionRepository } from "../modules/ingest/ingest.repository";
import IngestService from "../modules/ingest/ingest.service"
import ForwardService from "../modules/forward/forward.service";
import { EventDeliveryStatus } from "@prisma/client";


  

eventQueue.process( async (eventTask) => {
    let eventData = eventTask.data

    if (eventData.type == "forward-event") {
        let payload = JSON.stringify(eventData.data.payload)
        let headers = formatHeaders(eventData.data)

        let event = await IngestService.retrieveEvent(eventData.data.id)
        let subscription = await SubscriptionRepository.getOrCreate(event.sourceId)
       
        // forward event
        subscription.endpoints.forEach( async (endpoint) => {
            
            // Create event delivery object
            let eventDelivery = await ForwardService.createEventDelivery({
                eventId: event.id,
                endpointId: endpoint.id,
            })
            
            try {
                let response = await fetch(endpoint.url, {
                    method: "POST",
                    body: payload,
                    headers: headers
                })
                
                await ForwardService.updateEventDelivery( eventDelivery.id, {
                    status: response.ok ? EventDeliveryStatus.SUCCESSFUL: EventDeliveryStatus.FAILED,
                    response: `${response.status} ${response.statusText}`
                }) 
            } catch(error) {
                await ForwardService.updateEventDelivery( eventDelivery.id, {
                    status: EventDeliveryStatus.FAILED
                })
            }
        });
    }
    else if (eventData.type == "retry-event-delivery") {
        // 3 max retries
        if (eventData.data.retry_count >= 3){
            return null
        }
        const event = await IngestService.retrieveEvent(eventData.data.eventId)
        let payload = JSON.stringify(event.payload)
        let headers = formatHeaders(event)

        try {
            let response = await fetch(eventData.data.Endpoint.url, {
                method: "POST",
                body: payload,
                headers: headers
            });
            await ForwardService.updateEventDelivery( eventData.data.id, {
                retry_count: {increment: 1},
                status: response.ok ? EventDeliveryStatus.SUCCESSFUL: EventDeliveryStatus.FAILED,
                response: `${response.status} ${response.statusText}`
               
            });
        } catch(error) {
            await ForwardService.updateEventDelivery( eventData.data.id, {
                retry_count: {increment: 1},
                status: EventDeliveryStatus.FAILED
            });
        }
    }
});