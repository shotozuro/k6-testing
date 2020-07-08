import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  // 1 user looping for 1 minute
  vus: 1,
  duration: '1m',

  // 99% of requests must complete below 1s
  thresholds: {
    http_req_duration: ['p(99)<1000'],
    'retrieved json data': ['p(99)<1000'],
  },
};

export default () => {
  let URL = `${__ENV.URL}/${__ENV.ENDPOINT}`;
  let res = http.get(URL);

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
