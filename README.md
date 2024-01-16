# integration-example

[![release](https://github.com/sky172839465/integration-example/actions/workflows/release.yml/badge.svg)](https://github.com/sky172839465/integration-example/actions/workflows/release.yml)

When CI/CD testing gets into trouble, how can we debug faster?

This project demo front-end visualizes test results to improve development flow.

---

### Skip pr & release build

- pr title with `[skip ci]`
- exmaple: https://github.com/sky172839465/integration-example/pull/35

---

### Functional test in selenoid

- npm run start
- launch docker desktop
  - (`FIRST TIME ONLY`)
  - npm run selenoid:download
- npm run functional:selenoid (if localhost not found, check CRA `On Your Network` IP address)

---

### Manual browser in selenoid

- launch docker desktop
  - (`FIRST TIME ONLY`)
  - npm run selenoid:download
- npm run selenoid-ui:start
- access http://localhost:8080/#/capabilities/
