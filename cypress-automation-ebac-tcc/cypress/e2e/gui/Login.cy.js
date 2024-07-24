describe('Tela de login', () => {
  beforeEach(() => {
    cy.visit('minha-conta')
  });

  it('Successful authentication', () => {
    cy.guiLogin(Cypress.env('USER_EMAIL'), Cypress.env('USER_PASSWORD'))
    cy.contains('p', 'Olá, mailde14')
      .should('be.visible')
  });

  it('Invalid authentication', () => {
    cy.guiLogin('emailinexistente@email.com', 'senha09')
    cy.contains('.woocommerce-error', 'Endereço de e-mail desconhecido. Verifique novamente ou tente seu nome de usuário.')
      .should('be.visible')
  });

  it('Authenticate 3 times with wrong password until login is locked', () => {
    for (let i = 1; i <= 3; i++) {
      cy.guiLogin(Cypress.env('USER_EMAIL'), 'senhaerrada')
    }
  cy.contains('.woocommerce-error', `A senha fornecida para o e-mail ${Cypress.env('USER_EMAIL')} está incorreta. Perdeu a senha?`)
    .should('be.visible')
  });
});