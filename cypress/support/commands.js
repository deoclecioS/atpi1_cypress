// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('LoginNaAPI', ()=> {

    cy.request({
        url: 'https://conduit.productionready.io/api/users/login',
        method: 'POST',
        body: {
            "user": {
                "email": "teste4567@mail.com.br",
                "password": "123456"
            }
        }
    }).then(response => {
        cy.log(response.body.user.token)

        window.localStorage.setItem(
            'jwtToken',
            response.body.user.token )
    })
})

