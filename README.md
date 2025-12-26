# Grafana Plugin E2E – Playwright Framework | [![Grafana Playwright E2E](https://github.com/Rurutia1027/Grafana-Playwright-Test/actions/workflows/e2e-playwright-build.yaml/badge.svg)](https://github.com/Rurutia1027/Grafana-Playwright-Test/actions/workflows/e2e-playwright-build.yaml)

[**Test Reports**](https://rurutia1027.github.io/Grafana-Playwright-Test/)

This repository contains a **production-ready Playwright-based E2E framework** for Grafana. It focuses on **front-end and back-end integration testing** using Playwright’s native BDD-style syntax, providing robust, maintainable, and version-forward-compatible test coverage.


---

## Test Reports Tracing Display

<img width="1920" height="1036" alt="Screenshot 2025-12-26 at 19 40 50" src="https://github.com/user-attachments/assets/59cd70d9-76ee-4975-8d38-21ae23cedbf2" />


<img width="1920" height="797" alt="Screenshot 2025-12-26 at 19 42 55" src="https://github.com/user-attachments/assets/5cf3352c-d021-4899-b4a1-4c2d5185bed5" />


---

## Features

* **Playwright-first testing**: Fully utilizes Playwright’s `test`, `expect`, and `Project` abstractions.
* **BDD-style tests without Cucumber**: Tests use Playwright semantics to define behavior-driven flows.
* **Production-level Grafana coverage**: Includes core plugin tests, dashboards, data sources, and integrations.
* **Modular project configuration**: Each project can have isolated contexts, dependencies, and `storageState`.
* **Smoke and demo tests**: Quick checks for critical flows.
* **Forward-compatible**: Avoids tight coupling to Grafana DOM selectors.
* **CI/CD-ready**: Supports automated daily or per-commit test runs with HTML reports.

---

## Repository Structure

```
├── README.md
├── docker-compose.yml
├── docs
├── package.json
├── playwright-report
├── playwright.config.ts
├── src
│   ├── azuremonitor
│   ├── canvas
│   ├── cloud-plugins-suite
│   ├── cloudmonitoring
│   ├── cloudwatch
│   ├── dashboard-cujs
│   ├── dashboard-new-layouts
│   ├── dashboards-suite
│   ├── demo.spec.ts
│   ├── elasticsearch
│   ├── grafana-postgresql-datasource
│   ├── graphite
│   ├── influxdb
│   ├── jaeger
│   ├── loki
│   ├── mssql
│   ├── mysql
│   ├── opentsdb
│   ├── panels-suite
│   ├── plugin-e2e
│   ├── plugin-e2e-api-tests
│   ├── smoke-tests-suite
│   ├── test-plugins
│   ├── unauthenticated
│   ├── various-suite
│   └── zipkin
└── test-results
```

> Note: `node_modules` is excluded from the structure above.

---

## Getting Started

### Install dependencies

```bash
yarn install
npx playwright install
```

### Run Demo Test

```bash
npx playwright test src/demo.spec.ts --reporter=html
```

* Generates an HTML report under `playwright-report/`.
* Validates that Playwright configuration works and the demo test can run.

### Run All Tests

```bash
npx playwright test
```

---

## Folder Conventions

* **src/** – All test projects and demo tests.
* **plugin-e2e-api-tests/** – Plugin API E2E test templates.
* **playwright-report/** – Generated reports and traces.
* **test-results/** – Output of individual test runs.
* **docker-compose.yml** – Starts Grafana server and dependencies for E2E tests.
* **playwright.config.ts** – Central Playwright configuration including projects, dependencies, and auth handling.

---

## CI/CD Integration (Placeholder)

* Tests can be triggered on **GitHub Actions** or any CI pipeline.
* Example workflow:

```yaml
name: Playwright E2E

on:
  push:
    branches: [ main ]
  schedule:
    - cron: '0 0 * * *' # daily run at midnight

jobs:
  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '22'
      - run: yarn install
      - run: npx playwright install
      - run: docker compose up -d
      - run: npx playwright test --reporter=html
      - run: npx playwright show-report
```

This section can be expanded for full CI/CD automation, artifacts, and notifications.

---

## Notes

* Tests rely on **isolated Playwright projects** for each user/role and plugin scenario.
* Auth `storageState` files are used to maintain session contexts across tests.
* Keep empty directories with `.keep` files to maintain repo structure for future tests.
