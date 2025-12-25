import { test, expect } from '@playwright/test';
import { selectors } from '@grafana/e2e-selectors';

const BASE_URL = process.env.GRAFANA_URL ?? 'http://localhost:3000';
const ADMIN_USER = process.env.GRAFANA_ADMIN_USER ?? 'admin';
const ADMIN_PASS = process.env.GRAFANA_ADMIN_PASSWORD ?? 'admin';
const GRAFANA_VERSION = process.env.GRAFANA_VERSION ?? '12.3.1';

test.describe(`Grafana ${GRAFANA_VERSION} – selector contract validation`, () => {

    test('Debug: print available login selectors', () => {
    console.log('Login.username selector:', selectors.pages.Login.username);
    console.log('Login.password selector:', selectors.pages.Login.password);
    console.log('Login.submit selector:', selectors.pages.Login.submit);
    console.log('Login.skip selector:', selectors.pages.Login.skip);
});


});
