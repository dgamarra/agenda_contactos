module.exports = {
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    supportFile: false,
    specPattern: 'cypress/e2e/**/*.cy.js',
    chromeWebSecurity: false,
  },
  retries: {
    runMode: 0,
    openMode: 0,
  },
};
