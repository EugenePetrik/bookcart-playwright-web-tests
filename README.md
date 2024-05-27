## BookCart Web Tests

Web UI automated tests of [BookCart](https://bookcart.azurewebsites.net) site with Playwright.

### Technologies

- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Playwright](https://playwright.dev/)

### Installation

- Install [Node.js](https://nodejs.org/en/) LTS version

- Check that Node.js is installed

```bash
node -v
```

- Check that package manager npm is installed

```bash
npm -v
```

- Install project dependencies

```bash
npm install
```

### Run E2E tests

```bash
npm run test:e2e
```

### Run Accessibility tests

```bash
npm run test:a11y
```

### Run Lighthouse tests

```bash
npm run test:lighthouse
```

### Run Visual tests

```bash
npm run test:visual
```

### Features

1. Github Actions integrated with downloadable report
2. Page object model
3. Accessibility testing
4. Performance (Lighthouse) testing
5. Visual testing
