import { Endpoint, Source, Subscription } from "@prisma/client";
import { APIError } from "../../common";
import { SourceRepository, EndpointRepository, SubscriptionRepository } from "./ingest.repository";

export default class IngestService {

    static async createSource(data: any): Promise<Source> {
        const source = await SourceRepository.create(data);
        return source;
    }

    static async retrieveSources(): Promise<Source[]> {
        let sources = await SourceRepository.getMany();
        return sources;
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

    static async retrieveEndpoints(): Promise<Source[]> {
        let endpoints = await EndpointRepository.getMany();
        return endpoints;
    }

    static async retrieveEndpoint(id: string): Promise<Endpoint> {
        const endpoint = await EndpointRepository.getById(id);
        return endpoint;
    }

    static async updateEndpoint(id:string, data: any): Promise<Endpoint> {
        const endpoint = await EndpointRepository.update(id, data);
        return endpoint;
    }

    static async ingestEvent(data: any) {

    }

    static async subscribeEndpoint(sourceId: string, endpointId: string): Promise<Subscription> {
        const subscription = await SubscriptionRepository.create(sourceId, endpointId);
        return subscription;
    }

    static async unsubscribeEndpoint(sourceId: string, endpointId: string): Promise<void> {
        await SubscriptionRepository.delete(sourceId, endpointId);
    }


}

