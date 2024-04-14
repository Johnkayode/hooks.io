const SourceMock = {
    id: 'ID',
    name: 'Sample Source',
};

const SourcesMock = [
   {
    name: 'Sample Source A',
   },
   {
    name: 'Sample Source B',
   }
]

const EndpointMock = {
    id: 'ID',
    url: 'https://test.xyz',
};

const EndpointsMock = [
    {
     url: 'https://test1.xyz',
    },
    {
     url: 'https://test2.xyz',
    }
]

const SubscriptionMock = {
    source: {
        "id": "source-id",
        "name": "Source A"
    },
    endpoint: {
        "id": "endpoint-id",
        "url": "https://test.xyz"
    }
}

const EventMock = {
    id: "ID",
    sourceId: "",
    payload: {},
    headers: {}
}

const EventsMock = [
    {
        id: "ID",
        sourceId: "source-id-1",
        payload: {},
        headers: {}
    },
     {
        id: "ID",
        sourceId: "source-id-2",
        payload: {},
        headers: {}
    }
]

const EventDeliveryMock = {
    id: "ID",
    eventId: "event-id",
    endpointId: "endpoint-id",
    retry_count: 0,
    status: "PROCESSING"
}

const EventDeliveriesMock = [
    {
        id: "ID-1",
        eventId: "event-id-1",
        endpointId: "endpoint-id-1",
        retry_count: 0,
        status: "PROCESSING"
    },
    {
        id: "ID-2",
        eventId: "event-id-2",
        endpointId: "endpoint-id-2",
        retry_count: 1,
        status: "SUCCESSFUL"
    }
]


export { SourceMock, SourcesMock, EndpointMock, EndpointsMock, SubscriptionMock, EventMock, EventsMock, EventDeliveryMock, EventDeliveriesMock }
