export const formatHeaders = (data: any): any => {
    let payload = JSON.stringify(data.payload)
    let newHeaders = {
        ...data.headers,
        'content-type': 'application/json',
        'content-length': Buffer.byteLength(payload, 'utf8').toString(),
        'user-agent': "Hooks.io/1.0",
        'x-hooks-source-id': data.sourceId,
        // 'X-Forwarded-For': headers.host,
        // 'X-Forwarded-Host': "forwardedHost",
    }

    return newHeaders
}