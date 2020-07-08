import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '1m', target: 60 },
    { duration: '2m', target: 100 },
    { duration: '1m', target: 100 },
    { duration: '2m', target: 0 },
  ],

  // 99% of requests must complete below 1.5s
  thresholds: {
    http_req_duration: ['p(99)<1500'],
    'retrieved json data': ['p(99)<1500'],
  },
};

export default () => {
  let res = http.get(`${__ENV.URL}/${__ENV.ENDPOINT}`);

  check(res, {
    status: (r) => r.status === 200,
    'retrieved json data': (r) => {
      if (__ENV.ENDPOINT === 'hello') {
        return r.json().name === 'John Doe';
      } else if (__ENV.ENDPOINT === 'home') {
        return r.json().title === 'home';
      }
    },
  });

  sleep(1);
};
