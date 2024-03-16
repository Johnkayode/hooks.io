import { eventQueue } from "./bull";
import { formatHeaders } from "../utils/headers";
import { SubscriptionRepository } from "../modules/ingest/ingest.repository";
import IngestService from "../modules/ingest/ingest.service"

eventQueue.process( async (eventTask) => {
    let eventData = eventTask.data

    if (eventData.type == "forward-event") {
        let payload = eventData.data.payload
        console.log(eventData.data.headers)
        let headers = formatHeaders(eventData.data.sourceId, eventData.data.headers)

        let event = await IngestService.retrieveEvent(eventData.data.id)
        let subscription = await SubscriptionRepository.getOrCreate(event.sourceId)
       
        // forward and check response
        // update status and forwardedAt
        subscription.endpoints.forEach(endpoint => {
            fetch(endpoint.url, {
                method: "POST",
                body: JSON.stringify(payload),
                headers: headers
            }).then((response) => response.status )
            .then((json) => console.log(json));
        });
    }
});