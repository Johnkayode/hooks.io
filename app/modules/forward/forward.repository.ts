import { Event, EventDelivery } from "@prisma/client";
import prisma from "../../../prisma/client";


class EventDeliveryRepository {
    static async create(data: any): Promise<EventDelivery> {
        const newEventDelivery = await prisma.eventDelivery.create({
          data,
        });
        return newEventDelivery;
    }

    /**
     * Fetches eventDelivery by its ID.
     * @param id the eventDelivery ID.
     * @returns an eventDelivery or null.
     */
    static async getById(id: string): Promise<any> {
      let eventDelivery = await prisma.eventDelivery.findUnique({
          where: { id },
          include: { Endpoint: {select: { id:true, url: true }} },
      });
      return eventDelivery;
  }

    static async getMany(data?: any): Promise<any[]> {
        const eventDeliveries = await prisma.eventDelivery.findMany({
          where: data || {},
          include: { Endpoint: {select: { id:true, url: true }} },
          orderBy: {
            createdAt: 'desc',
          },
        });
        return eventDeliveries;
    }

     /**
     * Updates an endpoint by its ID.
     * @param id the endpoint ID.
     * @returns an endpoint or null.
     */
     static async update(id: string, data: any): Promise<any> {
      const eventDelivery = await prisma.eventDelivery.update({
          where: { id },
          data,
      });
      return eventDelivery;
  }
}

export { EventDeliveryRepository };