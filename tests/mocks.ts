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


export { SourceMock, SourcesMock, EndpointMock, EndpointsMock, SubscriptionMock }
