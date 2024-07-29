const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    frontendBaseUrl: 'http://localhost:3000',
    backendBaseUrl : 'http://localhost:5001',
    setupNodeEvents(on, config) {      
    }
  },
});
