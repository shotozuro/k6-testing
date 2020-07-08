import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  stages: [
    { duration: '1m', target: 90 },
    { duration: '1m', target: 100 },
    { duration: '2m', target: 200 },
    { duration: '1m', target: 200 },
    { duration: '2m', target: 300 },
    { duration: '2m', target: 400 },
    { duration: '5m', target: 400 },
    { duration: '5m', target: 0 },
  ],
};

export default function () {
  let res = http.get(`${__ENV.URL}/${__ENV.ENDPOINT}`);

  check(res, {
    status: (r) => r.status === 200,
  });

  sleep(1);
}
