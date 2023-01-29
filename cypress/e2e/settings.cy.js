/// <reference types="cypress" />


describe('Settings/ Configurações', () => {
    beforeEach(() => {

        cy.LoginNaAPI()
        cy.visit('/#/settings')
    });

    it('realizar logout', () => {
        cy.contains('Or click here to logout.').click()
        cy.screenshot()
    });
});
