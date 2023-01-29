const { defineConfig } = require("cypress");

module.exports = defineConfig({
  
  watchForFileChanges : false,

  reporter: 'cypress-mochawesome-reporter',

  e2e: {

    baseUrl: 'https://demo.realworld.io',

    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
