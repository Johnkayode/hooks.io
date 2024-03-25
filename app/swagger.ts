import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        version: 'v1.0.0',
        title: 'Hooks.io',
        description: ''
    },
    servers: [
        {
            url: 'http://localhost:5000',
            description: ''
        },
    ],
    components: {
        securitySchemes: {
        }
    },
    tags: [
        {
            "name": "Source",
            "description": "Webhook sources"
        },
        {
            "name": "Endpoint",
            "description": "Endpoints to consume webhook events"
        },
        {
            "name": "Event",
            "description": "Webhook events & event delivery"
        }
    ],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./app/modules/ingest/ingest.routes.ts'];

swaggerAutogen({openapi: '3.0.0'})(outputFile, endpointsFiles, doc);