import {faker} from '@faker-js/faker'

describe('Coupons API', () => {
    const auth = `Basic ${Cypress.env('ACCESS_TOKEN')}`;
    const baseURL = 'http://lojaebac.ebaconline.art.br/wp-json/wc/v3';
    const couponCode = faker.internet.domainName()

    it('Should create a new coupon', () => {
        cy.request({
            method: 'POST',
            url: `${baseURL}/coupons`,
            body: {
                code: couponCode,
                amount: "10",
                discount_type: "fixed_product",
                description: "Cupom de desconto de teste"
            },
            headers: {Authorization: auth}
        }).then(({ status}) => {
            expect(status).to.eq(201);
        });
    });

    it('Should not allow creating a coupon with duplicate code', () => {
        cy.request({
            method: 'POST',
            url: `${baseURL}/coupons`,
            body: {
                code: "fatherly-silver.name",
                amount: "10",
                discount_type: "fixed_product",
                description: "Cupom de desconto de teste"
            },
            headers: {Authorization: auth},
            failOnStatusCode: false
                }).then(({status, body}) => {
                     expect(status).to.eq(400);
                     expect(body.message).to.eq("O código de cupom já existe")
            });
    });
});