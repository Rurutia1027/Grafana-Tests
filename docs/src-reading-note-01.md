# Grafana Selectors and Playwright Usage (Expand Notes)
**Key Points**

## TypeScript Source (`public/`)
- Grafana plugins, pages, and components are written in TypeScript under `public/app/plugins/...`. 
- Contains React components, pages, plugin logic, and any helper classes. 
- Playwright tests ultimately interact with these components via selectors and fixtures. 


## Compilation Output (`dist/`)
- TypeScript files are compiled into JavaScript files under (`dist/`).
- These JS files contain **runtime logic** -- the actual implementation of classes and methods used in tests. 
- Examples: `GrafanaPage.js`, `DashboardPage.js`, `VariablePage.js`.

## Type Declaration (`index.d.ts`)
- `dist/index.d.ts` exposes all public classes, types, and functions from plugin-e2e.
- Provide **static type information** for TypeScript and IDE support.
- Does **not** contain any runtime logic. 
- Test scripts import components via `index.d.ts` for type safety and autocomplete. 

## Runtime Usage in Playwright Tests 
- Playwright executes the JS classes in `dist/` directly.
- No recompilation of TypeScript is required during test execution. 
- Example from a test report: 
```
Navigate to "/dashboard/new" — node_modules/@grafana/plugin-e2e/dist/models/pages/GrafanaPage.js:15
Click locator('[data-testid="Add button"]') — node_modules/@grafana/plugin-e2e/dist/models/pages/DashboardPage.js:116
Click locator('[data-testid="Add new visualization menu item"]') — node_modules/@grafana/plugin-e2e/dist/models/pages/DashboardPage.js:117
```
- Demostrates that tests call **runtime JS methods** while TypeScript ensures correct usageg via `index.d.ts`. 

## Selectors Design and Benefits
- Selectors wrap frontend components/pages into reusable abstractions. 
- Provide **consistent**, **maintainable access** to UI elements without hardcoding DOM queries. 
- Encourage collaboration between frontend developers and testers to define a stable interface. 
- Improve **test reliability**, **readability**, and **maintainability**, making automated frontend testing robust against UI changes. 

## Best Practices for Using Playwright with Grafana 
- Always use provided **selectors and fixtures** rather than raw page queries. 
- Use TypeScript imports from `index.d.ts` for type safety. 
- Rely on JS runtime from `dist/` for actual test execution. 
- Focus on understanding the mapping: **TS source** -> **compiled JS** -> **type declaration** -> **test scripts**. 

## Summary 
The `index.d.ts` file provides all importable components, classes, and types. The `dist/` JS files provide the actual runtime logic executed by Playwright. This separation allows test scripts to leverage TypeScript for type safety and JS for execution, while selectors create a reusable, stable interface between tests and frontend components, ensuring maintainable and reliable automation. 