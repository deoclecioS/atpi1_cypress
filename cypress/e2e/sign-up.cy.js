
describe('Sign Up / Cadastro', () => {

    beforeEach(() => {
        cy.visit('/#/register')
    });

    const tempo = new Date().getTime()

    it('Realizar cadastro com sucesso.', () => {

        cy.intercept({
            method: 'POST',
            hostname: 'api.realworld.io',
            pathname: '/api/users'
        }).as('postCriaUsuario')

        cy.get("[placeholder='Username']").type(`aleatorio${tempo}`)
        cy.get("[placeholder='Email']").type(`usuario${tempo}@teste.com`)
        cy.get("[placeholder='Password']").type("teste123")

        //cy.get("button[type='submit']").click()
        cy.get("form[ng-submit*='submitForm']").submit()

        cy.contains('Your Feed').should("be.visible")
        cy.get("a[href*='aleatorio']").should("contain.text", `aleatorio${tempo}`);

        cy.wait('@postCriaUsuario').then(interception => {
            expect(interception.response.statusCode).to.be.equal(200)
            expect(interception.response.body.user.token).to.not.be.empty
            expect(interception.response.body.user.username).to.be.contains(`aleatorio${tempo}`)
        })

    });

    it('Campo usuario não deve ficar em branco', () => {

        cy.intercept({
            method: 'POST',
            hostname: 'api.realworld.io',
            pathname: '/api/users'
        }).as('postUsuarioEmBranco')

        cy.get("[placeholder='Email']").type(`usuario${tempo}@teste.com`)
        cy.get("[placeholder='Password']").type("teste123")

        //cy.get("button[type='submit']").click()
        cy.get("form[ng-submit*='submitForm']").submit()
        cy.get("li[ng-repeat*='error']").should("contain.text", "username can't be blank")

        cy.wait('@postUsuarioEmBranco').then(interception => {
            expect(interception.response.statusCode).to.be.equal(422)
        })
    });

    it('Campo email não deve ficar em branco', () => {

        cy.intercept({
            method: 'POST',
            hostname: 'api.realworld.io',
            pathname: '/api/users'
        }).as('postEmailEmBranco')

        cy.get("[placeholder='Username']").type(`aleatorio${tempo}`)
        cy.get("[placeholder='Password']").type("teste123")

        cy.get("form[ng-submit*='submitForm']").submit()
        cy.get("li[ng-repeat*='error']").should("contain.text", "email can't be blank")

        cy.wait('@postEmailEmBranco').then(interception => {
            expect(interception.response.statusCode).to.be.equal(422)
        })
    });

    it('Campo senha não deve ficar em branco', () => {

        cy.intercept({
            method: 'POST',
            hostname: 'api.realworld.io',
            pathname: '/api/users'
        }).as('postSenhaEmBranco')

        cy.get("[placeholder='Username']").type(`aleatorio${tempo}`)
        cy.get("[placeholder='Email']").type(`usuario${tempo}@teste.com`)

        cy.get("form[ng-submit*='submitForm']").submit()
        cy.get("li[ng-repeat*='error']").should("contain.text", "password can't be blank")

        cy.wait('@postSenhaEmBranco').then(interception => {
            expect(interception.response.statusCode).to.be.equal(422)
        })
    });
});