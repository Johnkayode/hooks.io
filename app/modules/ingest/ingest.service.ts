import { Endpoint, Source, Subscription } from "@prisma/client";
import { APIError } from "../../common";
import { SourceRepository, EndpointRepository } from "./ingest.repository";

export default class IngestService {

    static async createSource(data: any): Promise<Source> {
        const source = await SourceRepository.create(data);
        return source;
    }

    static async retrieveSource(id: string): Promise<Source> {
        let source = await SourceRepository.getById(id);
        source.url = `/ingest/${source.id}`
        return source;
    }

    static async createEndpoint(data: any): Promise<Endpoint> {
        const endpoint = await EndpointRepository.create(data);
        return endpoint;
    }

    static async ingestEvent(data: any) {

    }

    // static async subscribeEndpoint(data: any): Promise<Subscription> {
        
    // }

    // static async unsubscribeEndpoint(data: any): Promise<Subscription> {
        
    // }

}

