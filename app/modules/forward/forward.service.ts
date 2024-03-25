import { Endpoint, Source, Subscription, EventDelivery } from "@prisma/client";
import { EventDeliveryRepository } from "./forward.repository";

export default class ForwardService {

    static async createEventDelivery(data: any): Promise<EventDelivery> {
        const source = await EventDeliveryRepository.create(data);
        return source;
    }

    static async updateEventDelivery(id: string, data?: any): Promise<EventDelivery[]> {
        let eventDelivery = await EventDeliveryRepository.update(id, data);
        return eventDelivery;
    }

    static async retrieveEventDeliveries(data?: any): Promise<EventDelivery[]> {
        let eventDeliveries = await EventDeliveryRepository.getMany(data || {});
        return eventDeliveries;
    }

    static async retrieveEventDelivery(id: string): Promise<EventDelivery> {
        const endpoint = await EventDeliveryRepository.getById(id);
        return endpoint;
    }

    
    
}