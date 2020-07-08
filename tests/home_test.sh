#!/bin/bash
BASE_URL=http://localhost:8000
ENDPOINT=home
echo '========================'
echo '=  Running smoke test on '$BASE_URL/$ENDPOINT;
echo '========================'
k6 run -e URL=$BASE_URL -e ENDPOINT=$ENDPOINT ./tests/smoke.test.js;

echo '========================'
echo '=  Running load test on '$BASE_URL/$ENDPOINT;
echo '========================'
k6 run -e URL=$BASE_URL -e ENDPOINT=$ENDPOINT ./tests/load.test.js;

echo '========================'
echo '=  Running stress test on '$BASE_URL/$ENDPOINT;
echo '========================'
k6 run -e URL=$BASE_URL -e ENDPOINT=$ENDPOINT ./tests/stress.test.js;

echo '========================'
echo '=  Running soak test on '$BASE_URL/$ENDPOINT;
echo '========================'
k6 run -e URL=$BASE_URL -e ENDPOINT=$ENDPOINT ./tests/soak.test.js;