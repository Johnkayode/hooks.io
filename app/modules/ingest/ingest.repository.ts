import { Source } from "@prisma/client";
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


export { SourceRepository, EndpointRepository, SubscriptionRepository }