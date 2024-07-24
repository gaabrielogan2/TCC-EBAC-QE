Cypress.Commands.add('guiLogin', (
    username = Cypress.env('USER_EMAIL'),
    password = Cypress.env('USER_PASSWORD')
  ) => {
    cy.visit('minha-conta')
    cy.get('#username').type(username)
    cy.get('#password').type(password)
    cy.contains('input', 'Login').click()
  })
  
  Cypress.Commands.add('sessionLogin', (
    username = Cypress.env('USER_EMAIL'),
    password = Cypress.env('USER_PASSWORD')
  ) => {
    const login = () => cy.guiLogin(username, password)
    cy.session(username, login)
  })