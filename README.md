# integration-example

[![release](https://github.com/sky172839465/integration-example/actions/workflows/release.yml/badge.svg)](https://github.com/sky172839465/integration-example/actions/workflows/release.yml)

When CI/CD testing gets into trouble, how can we debug faster?

This project demo front-end visualizes test results to improve development flow.

---

### Installation

- docker deskop<br />
  https://www.docker.com/products/docker-desktop/

---

### Skip pr & release build

- pr last commit with `[skip ci]`
- exmaple: https://github.com/sky172839465/integration-example/pull/39

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

---

### Document

- CodeceptJS<br />
  https://codecept.io/quickstart/
- SauceLabs<br />
  https://docs.saucelabs.com/overview/
- Selenoid<br />
  https://aerokube.com/selenoid/latest/
- GitHub Actions<br />
  https://docs.github.com/en/actions/quickstart
- Fly.io<br />
  https://fly.io/docs/
