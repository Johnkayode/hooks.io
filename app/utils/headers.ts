export const formatHeaders = (sourceId: string, headers: any): any => {
   
    let newHeaders =  {
        'X-Hooks-Source-Id': sourceId,
        'X-Forwarded-For': headers.host,
        'X-Forwarded-Host': "forwardedHost",
    }
    return newHeaders
}