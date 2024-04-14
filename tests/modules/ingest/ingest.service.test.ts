import request from 'supertest';
import { EndpointMock, EndpointsMock, SourceMock, SourcesMock, SubscriptionMock, EventMock, EventsMock } from '../../mocks';
import IngestService from '../../../app/modules/ingest/ingest.service';
import { SourceRepository, EndpointRepository, SubscriptionRepository, EventRepository } from '../../../app/modules/ingest/ingest.repository'
import { app } from '../../../app/app';


jest.mock('../../../app/modules/ingest/ingest.repository', () => ( {
    SourceRepository: {
        create: jest.fn(() => SourceMock),
        getMany: jest.fn(() => SourcesMock),
        getById: jest.fn((id) => SourceMock),
        update: jest.fn((id) => SourceMock),
    },
    EndpointRepository: {
        create: jest.fn(() => EndpointMock),
        getMany: jest.fn(() => EndpointsMock),
        getById: jest.fn((id) => EndpointMock),
        update: jest.fn((id, data) => EndpointMock),
    },
    SubscriptionRepository: {
        getOrCreate: jest.fn((sourceId) => SubscriptionMock),
        create: jest.fn((sourceId, endpointId) => SubscriptionMock),
        delete: jest.fn((sourceId, endpointId) => undefined),
    },
    EventRepository: {
        create: jest.fn((data) => EventMock),
        getMany: jest.fn(() => EventsMock),
        getById: jest.fn((id) => EventMock)
    }
}
));

describe('IngestService', () => {
    afterAll(() => {
      jest.clearAllMocks();
    });
    
    describe('IngestService.createSource', () => {
      it('should call SourceRepository.create', async () => {
        const source = await IngestService.createSource(SourceMock);
        expect(SourceRepository.create).toHaveBeenCalledWith(SourceMock);
        expect(source).toEqual(SourceMock);
      });
    });
  
    describe('IngestService.retrieveSources', () => {
      it('should call SourceRepository.getMany', async () => {
        const sources = await IngestService.retrieveSources();
        expect(SourceRepository.getMany).toHaveBeenCalled();
        expect(sources).toEqual(SourcesMock);
      });
    });

    describe('IngestService.retrieveSource', () => {
        it('should call SourceRepository.getById', async () => {
          const id = "ID"
          const source = await IngestService.retrieveSource(id);
          expect(SourceRepository.getById).toHaveBeenCalledWith(id);
          expect(source).toEqual(SourceMock);
        });
    });

    describe('IngestService.updateSource', () => {
        it('should call SourceRepository.update', async () => {
          const id = "ID";
          const source = await IngestService.updateSource(id, {"name": "Source B"});
          expect(SourceRepository.update).toHaveBeenCalled();
          expect(source).toEqual(SourceMock);
        });
    });

    describe('IngestService.createEndpoint', () => {
        it('should call EndpointRepository.create', async () => {
          const endpoint = await IngestService.createEndpoint(EndpointMock);
          expect(EndpointRepository.create).toHaveBeenCalledWith(EndpointMock);
          expect(endpoint).toEqual(EndpointMock);
        });
    });
    
    describe('IngestService.retrieveEndpoints', () => {
        it('should call EndpointRepository.getMany', async () => {
          const endpoint = await IngestService.retrieveEndpoints();
          expect(EndpointRepository.getMany).toHaveBeenCalled();
          expect(endpoint).toEqual(EndpointsMock);
        });
    });
  
    describe('IngestService.retrieveEndpoint', () => {
          it('should call EndpointRepository.getById', async () => {
            const id = "ID"
            const endpoint = await IngestService.retrieveEndpoint(id);
            expect(EndpointRepository.getById).toHaveBeenCalledWith(id);
            expect(endpoint).toEqual(EndpointMock);
          });
    });
  
    describe('IngestService.updateEndpoint', () => {
          it('should call EndpointRepository.update', async () => {
            const id = "ID";
            const endpoint = await IngestService.updateEndpoint(id, {"url": "https://test-b.xyz"});
            expect(EndpointRepository.update).toHaveBeenCalled();
            expect(endpoint).toEqual(EndpointMock);
          });
    });

    describe('IngestService.subscribeEndpoint', () => {
        it('should call SubscriptionRepository.create', async () => {
            let sourceId = "source-id";
            let endpointId = "endpoint-id";
            const subscription = await IngestService.subscribeEndpoint(sourceId, endpointId);
            expect(SubscriptionRepository.create).toHaveBeenCalledWith(sourceId, endpointId);
            expect(subscription).toEqual(SubscriptionMock);
        });
    });

    describe('IngestService.unsubscribeEndpoint', () => {
        it('should call SubscriptionRepository.delete', async () => {
            let sourceId = "source-id";
            let endpointId = "endpoint-id";
            await IngestService.unsubscribeEndpoint(sourceId, endpointId);
            expect(SubscriptionRepository.delete).toHaveBeenCalledWith(sourceId, endpointId);
        });
    });

    describe('IngestService.ingestEvent', () => {
        it('should call EventRepository.create', async () => {
          const event = await IngestService.ingestEvent(EventMock);
          expect(EventRepository.create).toHaveBeenCalledWith(EventMock);
          expect(event).toEqual(EventMock);
        });
      });
    
    describe('IngestService.retrieveEvents', () => {
        it('should call EventRepository.getMany', async () => {
            const events = await IngestService.retrieveEvents();
            expect(EventRepository.getMany).toHaveBeenCalled();
            expect(events).toEqual(EventsMock);
        });
    });
  
    describe('IngestService.retrieveEvent', () => {
        it('should call EventRepository.getById', async () => {
            const id = "ID"
            const event = await IngestService.retrieveEvent(id);
            expect(EventRepository.getById).toHaveBeenCalledWith(id);
            expect(event).toEqual(EventMock);
        });
    });
    
})