import { v4 as uuidv4 } from 'uuid'; 
import { test, expect } from '@grafana/plugin-e2e'; 

test.describe(
    'Smoke tests',
    {
        tag: [ '@acceptance' ],
    },
    () => {
        test('Login, create test data source, create dashboard and panel scenario', async ({
            createDataSourceConfigPage,
            gotoDashboardPage,
            selectors,
            page,
        }) => {
        }); 
    }
); 