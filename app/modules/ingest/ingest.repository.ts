import { Event, EventStatus, Source } from "@prisma/client";
import prisma from "../../../prisma/client";


class SourceRepository {
    static async create(data: any): Promise<Source> {
        const newSource = await prisma.source.create({
          data,
        });
        return newSource;
    }

    static async getMany(data?: any): Promise<any[]> {
        const sources = await prisma.source.findMany({
          where: data || {},
          orderBy: {
            createdAt: 'desc',
          },
        });
        return sources;
    }

    /**
     * Fetches one source by its ID.
     * @param id the source ID.
     * @returns a source or null.
     */
    static async getById(id: string): Promise<any> {
        let source = await prisma.source.findUnique({
            where: { id },
            include: { 
                Subscription: { select: { id:true, endpoints: true } }
            },
        });
        
        return source;
    }

     /**
     * Deletes a source by its ID.
     * @param id the source ID.
     * @returns
     */
    static async delete(id: string): Promise<void> {
        await prisma.source.delete({
            where: { id },
        });
    }
}

class EndpointRepository {
    static async create(data: any): Promise<any> {
        const newEndpoint = await prisma.endpoint.create({
          data,
        });
        return newEndpoint;
    }

    static async getMany(data?: any): Promise<any[]> {
        const endpoints = await prisma.endpoint.findMany({
          where: data || {},
          orderBy: {
            createdAt: 'desc',
          },
        });
        return endpoints;
    }

    /**
     * Fetches an endpoint by its ID.
     * @param id the endpoint ID.
     * @returns an endpoint or null.
     */
    static async getById(id: string): Promise<any> {
        let endpoint = await prisma.endpoint.findUnique({
            where: { id },
            include: { subscriptions: true },
        });
        return endpoint;
    }

    /**
     * Updates an endpoint by its ID.
     * @param id the endpoint ID.
     * @returns an endpoint or null.
     */
    static async update(id: string, data: any): Promise<any> {
        const endpoint = await prisma.endpoint.update({
            where: { id },
            data,
        });
        return endpoint;
    }

     /**
     * Deletes an endpoint by its ID.
     * @param id the endpoint ID.
     * @returns
     */
    static async delete(id: string): Promise<void> {
        await prisma.endpoint.delete({
            where: { id },
        });
    }
}

class SubscriptionRepository {

    static async getOrCreate(sourceId) {
        let subscription;  

        await prisma.$transaction( async (tx) => {
            subscription = await tx.subscription.findFirst({
                where: {
                    sourceId,
                },
                include: { endpoints: {select: { id:true, url: true }} }
            })
            if (!subscription) {
                subscription = await tx.subscription.create({  
                    data: {
                        sourceId
                    }, 
                })
            }
        })
        return subscription;
        
        
    }

    static async create(sourceId: string, endpointId: string): Promise<any> {
        let subscription = await this.getOrCreate(sourceId);
        
        subscription = await prisma.subscription.update({
            where: { id: subscription.id },
            data: {
                endpoints: {
                    connect: {
                        id: endpointId
                    }
                }
            },
        });

        return subscription;

    }

    static async delete(sourceId: string, endpointId: string): Promise<any> {
        let subscription = await this.getOrCreate(sourceId);
        subscription = await prisma.subscription.update({
            where: { id: subscription.id },
            data: {
                endpoints: {
                    disconnect: {
                        id: endpointId
                    }
                }
            },
        });
    }
 
}

class EventRepository {
    static async create(data: any): Promise<Event> {
        const newEvent = await prisma.event.create({
          data,
        });
        return newEvent;
    }

    static async getMany(data?: any): Promise<Event[]> {
        const events = await prisma.event.findMany({
          where: data || {},
          include: { Source: {select: { id:true, name: true }} },
          orderBy: {
            createdAt: 'desc',
          },
        });
        return events;
    }

    /**
     * Fetches an event by its ID.
     * @param id the event ID.
     * @returns an event or null.
     */
    static async getById(id: string): Promise<Event> {
        let event = await prisma.event.findUnique({
            where: { id },
            include: { Source: true },
        });
        return event;
    }

    /**
     * Updates an event status.
     * @param id the endpoint ID.
     * @param status new status.
     * @returns an event.
     */
    static async update(id: string, status: EventStatus): Promise<Event> {
        const event = await prisma.event.update({
            where: { id },
            data: {
                status
            },
        });
        return event;
    }
}


export { SourceRepository, EndpointRepository, SubscriptionRepository, EventRepository }