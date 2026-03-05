// src/tests/config/cypress.config.ts
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4201',
    specPattern: 'src/tests/e2e/use-cases/**/*.cy.ts',
    fixturesFolder: 'src/tests/e2e/fixtures',
    supportFile: 'src/tests/e2e/support/e2e.ts',
    videosFolder: 'src/tests/e2e/videos',
    screenshotsFolder: 'src/tests/e2e/screenshots',
  },
});
