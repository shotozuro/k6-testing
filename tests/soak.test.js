import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '2m', target: 400 },
    { duration: '30m', target: 400 },
    { duration: '2m', target: 0 },
  ],
};

export default function () {
  let res = http.get(`${__ENV.URL}/${__ENV.ENDPOINT}`);

  check(res, {
    status: (r) => r.status === 200,
  });
  sleep(1);
}
