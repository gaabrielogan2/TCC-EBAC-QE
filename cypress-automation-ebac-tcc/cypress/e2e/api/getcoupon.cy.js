describe('Coupons API', () => {
    const auth = `Basic ${Cypress.env('ACCESS_TOKEN')}`;
    const baseURL = 'http://lojaebac.ebaconline.art.br/wp-json/wc/v3';

    it('Should list all registered coupons', () => {
        cy.request({
            method: 'GET',
            url: `${baseURL}/coupons`,
            headers: { Authorization: auth }
        }).then(({ status, body }) => {
            expect(status).to.eq(200);
            expect(body).to.be.an('array');
        });
    });

    it('Should list a specific coupon by ID', () => {
        const couponId = 4739;
        cy.request({
            method: 'GET',
            url: `${baseURL}/coupons/${couponId}`,
            headers: { Authorization: auth }
        }).then(({ status, body }) => {
            expect(status).to.eq(200);
            expect(body).to.be.an('object');
            expect(body.id).to.eq(couponId);
        });
    });
});
