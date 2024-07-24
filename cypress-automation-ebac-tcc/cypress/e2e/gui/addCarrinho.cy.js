import { faker } from '@faker-js/faker';

describe('Adding product to the cart', () => {
    beforeEach(() => {
        cy.sessionLogin();
        cy.visit('produtos');
    });

    const user = {
        firstName: faker.internet.userName(),
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        postCode: '17450-970',
        phone: '98763534',
        email: faker.internet.email()
    };

    it('Adding product to the cart', () => {
        cy.contains('Abominable Hoodie').click();
        cy.get('.button-variable-item-S').click();
        cy.get('.button-variable-item-Green').click();
        cy.get('.single_add_to_cart_button').click();
        cy.visit('carrinho');
        cy.get('.checkout-button').click();
        cy.get('#billing_first_name').type(user.firstName);
        cy.get('#billing_last_name').type(user.firstName);
        cy.get('#billing_address_1').type(user.address)
        cy.get('#billing_city').type(user.city)
        cy.get('#billing_postcode').type(user.postCode)
        cy.get('#billing_phone').type(user.phone)
        cy.get('#billing_email').type(user.email)
        cy.get('#terms').check()
        cy.contains('input', 'Finalizar compra').click()
        
        cy.get('h1')
            .should('contain.text', 'Pedido recebido')
        
    });
});
