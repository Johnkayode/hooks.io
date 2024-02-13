import * as Bull from "bull"; 

const taskQueue = new Bull('taskQueue', {
    redis: {
      port: 6379,
      host: 'localhost'
    }
});