import request from 'supertest';
import { EndpointMock, EndpointsMock, SourceMock, SourcesMock } from '../../mocks';
import IngestService from '../../../app/modules/ingest/ingest.service';
import { app } from '../../../app/app';

// jest.mock('../../../app/modules/ingest/ingest.service', () => ({
//     default: {
//       createSource: jest.fn(() => SourceMock),
//       retrieveSources: jest.fn(() => SourcesMock),
//       retrieveSource: jest.fn((id) => SourceMock),
//       createEndpoint: jest.fn(() => EndpointMock),
//       retrieveEndpoints: jest.fn(() => EndpointsMock),
//       retrieveEndpoint: jest.fn((id) => EndpointMock),
//     //   updateUser: jest.fn(() => UserMock),
//     //   changeUserRole: jest.fn(() => UserMock),
//     //   deleteUser: jest.fn(),
//     }
// }));

describe('/source Endpoints.', () => {
   
    describe('POST /source/', () => {
      it('create a new source.', async () => {
        const body = {
          name: 'New Source',
        };
        const response = await request(app)
        .post('/source/')
        .send(body);
        console.log(response)
        // expect(IngestService.createSource).toHaveBeenCalledWith(body);
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
        console.log(response)
        //   expect(IngestService.retrieveSources).toHaveBeenCalled();
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
        //   expect(IngestService.retrieveSource).toHaveBeenCalledWith(id);
          expect(response.statusCode).toBe(200);
          expect(response.body.success).toBe(true);
          expect(response.body.message).toBe('Source retrieved.');
          expect(response.body.data).toStrictEqual(SourceMock);
        });
      });


})

describe('/endpoint Endpoints.', () => {
   
    describe('POST /endpoint/', () => {
      it('create a new endpoint.', async () => {
        const body = {
          url: 'https://text.xyz',
        };
        const response = await request(app)
        .post('/endpoint/')
        .send(body);

        // expect(FolderService.createFolder).toBeCalledWith(body);
        expect(response.statusCode).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Source created.');
        // expect(response.body.data).toStrictEqual(FolderMock);
      });
    });

    describe('GET /endpoint/', () => {
        it('retrieve an endpoint.', async () => {
          const response = await request(app)
          .get('/endpoint/')
  
          // expect(FolderService.createFolder).toBeCalledWith(body);
          expect(response.statusCode).toBe(200);
          expect(response.body.success).toBe(true);
          expect(response.body.message).toBe('Sources retrieved.');
          // expect(response.body.data).toStrictEqual(FolderMock);
        });
    });

    describe('GET /endpoint/:id/', () => {
        it('returns the mocked data.', async () => {
          const id = 'ID';
          const response = await request(app)
            .get(`/source/${id}/`)
        //   expect(FolderService.getFolderById).toBeCalledWith(id);
          expect(response.statusCode).toBe(200);
          expect(response.body.success).toBe(true);
          expect(response.body.message).toBe('Source retrieved.');
        //   expect(response.body.data).toStrictEqual(FolderMock);
        });
      });


})