import request from 'supertest';
import { EventDeliveryMock, EventDeliveriesMock } from '../../mocks';
import ForwardService from '../../../app/modules/forward/forward.service';
import { EventDeliveryRepository } from '../../../app/modules/forward/forward.repository'
import { app } from '../../../app/app';

jest.mock('../../../app/modules/forward/forward.repository', () => ( {
    EventDeliveryRepository: {
        create: jest.fn(() => EventDeliveryMock),
        getMany: jest.fn(() => EventDeliveriesMock),
        getById: jest.fn((id) => EventDeliveryMock),
        update: jest.fn((id) => EventDeliveryMock),
    },
}
));

describe('ForwardService', () => {
    afterAll(() => {
      jest.clearAllMocks();
    });
    
    describe('ForwardService.createEventDelivery', () => {
      it('should call EventDeliveryRepository.create', async () => {
        const source = await ForwardService.createEventDelivery(EventDeliveryMock);
        expect(EventDeliveryRepository.create).toHaveBeenCalledWith(EventDeliveryMock);
        expect(source).toEqual(EventDeliveryMock);
      });
    });
  
    describe('ForwardService.retrieveEventDeliveries', () => {
      it('should call EventDeliveryRepository.getMany', async () => {
        const eventDeliveries = await ForwardService.retrieveEventDeliveries();
        expect(EventDeliveryRepository.getMany).toHaveBeenCalled();
        expect(eventDeliveries).toEqual(EventDeliveriesMock);
      });
    });

    describe('ForwardService.retrieveEventDelivery', () => {
        it('should call SourceRepository.getById', async () => {
          const id = "ID"
          const eventDelivery = await ForwardService.retrieveEventDelivery(id);
          expect(EventDeliveryRepository.getById).toHaveBeenCalledWith(id);
          expect(eventDelivery).toEqual(EventDeliveryMock);
        });
    });

    describe('IngestService.updateSource', () => {
        it('should call SourceRepository.update', async () => {
          const id = "ID";
          const eventDelivery = await ForwardService.updateEventDelivery(id, {"status": "SUCCESSFUL"});
          expect(EventDeliveryRepository.update).toHaveBeenCalled();
          expect(eventDelivery).toEqual(EventDeliveryMock);
        });
    });
})