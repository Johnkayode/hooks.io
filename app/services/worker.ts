import { eventQueue } from "./bull";
import { formatHeaders } from "../utils/headers";
import IngestService from "../modules/ingest/ingest.service"

eventQueue.process( async (eventTask) => {
    let eventData = eventTask.data
    if (eventData.type == "forward-event") {
        let payload = eventData.data.payload
        let headers = formatHeaders(eventData.data.sourceId, eventData.data.headers)

        let event = IngestService.retrieveEvent(eventData.data.id)
        // forward and check response
        // update status and forwardedAt
    }
});