import request from 'supertest';
import { EndpointMock, EndpointsMock, SourceMock, SourcesMock, SubscriptionMock } from '../../mocks';
import IngestService from '../../../app/modules/ingest/ingest.service';
import { app } from '../../../app/app';

jest.mock('../../../app/modules/ingest/ingest.service', () => ( {
      createSource: jest.fn(() => SourceMock),
      retrieveSources: jest.fn(() => SourcesMock),
      retrieveSource: jest.fn((id) => SourceMock),
      updateSource: jest.fn((id) => SourceMock),
      createEndpoint: jest.fn(() => EndpointMock),
      retrieveEndpoints: jest.fn(() => EndpointsMock),
      retrieveEndpoint: jest.fn((id) => EndpointMock),
      updateEndpoint: jest.fn((id, data) => EndpointMock),
      subscribeEndpoint: jest.fn((sourceId, endpointId) => SubscriptionMock),
      unsubscribeEndpoint: jest.fn((sourceId, endpointId) => null)
}));

describe('/source Endpoints.', () => {
   
    describe('POST /source/', () => {
      it('create a new source.', async () => {
        const body = {
          name: 'New Source',
        };
        const response = await request(app)
        .post('/source/')
        .send(body);
        
        expect(IngestService.createSource).toHaveBeenCalledWith(body);
        expect(response.statusCode).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Source created.');
        expect(response.body.data).toStrictEqual(SourceMock);
      });
    });

    describe('GET /source/', () => {
        it('retrieve sources.', async () => {
          const response = await request(app)
          .get('/source/')

          expect(IngestService.retrieveSources).toHaveBeenCalled();
          expect(response.statusCode).toBe(200);
          expect(response.body.success).toBe(true);
          expect(response.body.message).toBe('Sources retrieved.');
          expect(response.body.data).toStrictEqual(SourcesMock);
        });
    });

    describe('GET /source/:id/', () => {
        it('retrieves a source.', async () => {
          const id = 'ID';
          const response = await request(app)
            .get(`/source/${id}/`)
          expect(IngestService.retrieveSource).toHaveBeenCalledWith(id);
          expect(response.statusCode).toBe(200);
          expect(response.body.success).toBe(true);
          expect(response.body.message).toBe('Source retrieved.');
          expect(response.body.data).toStrictEqual(SourceMock);
        });
    });

    describe('PATCH /source/:id/', () => {
        it('update a source.', async () => {
          const id = 'ID';
          const body = {
            name: 'Source',
          };
          const response = await request(app)
            .patch(`/source/${id}/`)
            .send(body)
          expect(IngestService.updateSource).toHaveBeenCalledWith(id, body);
          expect(response.statusCode).toBe(201);
          expect(response.body.success).toBe(true);
          expect(response.body.message).toBe('Source updated.');
          expect(response.body.data).toStrictEqual(SourceMock);
        });
    });


})

describe('/endpoint Endpoints.', () => {
   
    describe('POST /endpoint/', () => {
      it('create a new endpoint.', async () => {
        const body = {
          url: 'https://test.xyz',
        };
        const response = await request(app)
        .post('/endpoint/')
        .send(body);

        expect(IngestService.createEndpoint).toHaveBeenCalledWith(body);
        expect(response.statusCode).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Endpoint created.');
        expect(response.body.data).toStrictEqual(EndpointMock);
      });
    });

    describe('GET /endpoint/', () => {
        it('retrieve endpointS.', async () => {
          const response = await request(app)
          .get('/endpoint/')
  
          expect(IngestService.retrieveEndpoints).toHaveBeenCalledWith();
          expect(response.statusCode).toBe(200);
          expect(response.body.success).toBe(true);
          expect(response.body.message).toBe('Endpoints retrieved.');
          expect(response.body.data).toStrictEqual(EndpointsMock);
        });
    });

    describe('GET /endpoint/:id/', () => {
        it('retrieve an endpoint.', async () => {
          const id = 'ID';
          const response = await request(app)
            .get(`/endpoint/${id}/`)
          expect(IngestService.retrieveEndpoint).toHaveBeenCalledWith(id);
          expect(response.statusCode).toBe(200);
          expect(response.body.success).toBe(true);
          expect(response.body.message).toBe('Endpoint retrieved.');
          expect(response.body.data).toStrictEqual(EndpointMock);
        });
    });

    describe('PATCH /endpoint/:id/', () => {
        it('update an endpoint.', async () => {
          const id = 'ID';
          const body = {
            url: 'https://test2.xyz',
          };
          const response = await request(app)
            .patch(`/endpoint/${id}/`)
            .send(body)
          expect(IngestService.updateEndpoint).toHaveBeenCalledWith(id, body);
          expect(response.statusCode).toBe(201);
          expect(response.body.success).toBe(true);
          expect(response.body.message).toBe('Endpoint updated.');
          expect(response.body.data).toStrictEqual(EndpointMock);
        });
    });

    describe('POST /endpoint/:id/subscribe', () => {
        it('subscribes an endpoint to a source.', async () => {
            const id = 'endpoint-id';
            const body = {
              sourceId: 'source-id',
            };
            const response = await request(app)
              .post(`/endpoint/${id}/subscribe`)
              .send(body)
            expect(IngestService.subscribeEndpoint).toHaveBeenCalledWith(body.sourceId, id);
            expect(response.statusCode).toBe(201);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Endpoint subscribed.');
            expect(response.body.data).toStrictEqual(SubscriptionMock);
          });
    })

    describe('POST /endpoint/:id/unsubscribe', () => {
        it('unsubscribes an endpoint to a source.', async () => {
            const id = 'endpoint-id';
            const body = {
              sourceId: 'source-id',
            };
            const response = await request(app)
              .post(`/endpoint/${id}/unsubscribe`)
              .send(body)
            expect(IngestService.unsubscribeEndpoint).toHaveBeenCalledWith(body.sourceId, id);
            expect(response.statusCode).toBe(201);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Endpoint unsubscribed.');
            expect(response.body.data).toStrictEqual(null);
          });
    })
})

