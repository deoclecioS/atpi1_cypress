declare namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Realiza login via request na API 
       * @example
       * cy.LoginNaAPI()
       */
       LoginNaAPI(): void
     
    }
  }