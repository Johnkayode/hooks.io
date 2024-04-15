import { Endpoint, Source, Subscription, Event } from "@prisma/client";
import { APIError } from "../../common";
import { SourceRepository, EndpointRepository, SubscriptionRepository, EventRepository } from "./ingest.repository";

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
        if (source) {source.url = `/ingest/${source.id}`}
        return source;
    }

    static async updateSource(id:string, data: any): Promise<Source> {
        const source = await SourceRepository.update(id, data);
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

    static async subscribeEndpoint(sourceId: string, endpointId: string): Promise<Subscription> {
        const subscription = await SubscriptionRepository.create(sourceId, endpointId);
        return subscription;
    }

    static async unsubscribeEndpoint(sourceId: string, endpointId: string): Promise<void> {
        await SubscriptionRepository.delete(sourceId, endpointId);
    }

    static async ingestEvent(data: any) {
        const event = await EventRepository.create(data);
        return event
    }

    static async retrieveEvents(data?: any): Promise<Event[]> {
        // TODO: Add pagination
        let events = await EventRepository.getMany(data || {});
        return events;
    }

    static async retrieveEvent(id: string): Promise<Event> {
        const event = await EventRepository.getById(id);
        return event;
    }


}

