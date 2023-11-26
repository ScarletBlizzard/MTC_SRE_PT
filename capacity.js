import http from 'k6/http';

export const options = {
  discardResponseBodies: true,

  thresholds: {
    http_req_failed: ['rate<0.005'],
    http_req_duration: ['p(95)<200'],
  },

  scenarios: {
    capacity: {
      executor: 'ramping-arrival-rate',
      startRate: 1,
      timeUnit: '1s',
      preAllocatedVUs: 10000,
      stages: [
        { target: 1500, duration: '30s' },
        { target: 1500, duration: '5s' },
      ],
    },
  },
};

export default function () {
  const params = {
    headers: {
      'Host': 'weather-api-94',
    },
  };

  http.get('http://91.185.85.213/WeatherForecast', params);
}

