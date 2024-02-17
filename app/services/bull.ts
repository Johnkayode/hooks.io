import * as Bull from "bull"; 

export const eventQueue = new Bull('eventQueue', {
    redis: {
      port: 6379,
      host: 'redis'
    }
});

