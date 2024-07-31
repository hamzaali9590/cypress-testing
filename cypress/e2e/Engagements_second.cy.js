describe('The Engagement Page', () => {
  beforeEach(function() {
    cy.fixture('user').then((user) => {
      this.user = user;
    });
  });

  it('Logins user', function() {
    const baseUrlFrontend = Cypress.config('frontendBaseUrl');
    cy.visit(`${baseUrlFrontend}/login`, { failOnStatusCode: false });
    cy.get('form');
    cy.get('input[type=text]').type(this.user.userName, { force: true });
    cy.get('input[type=password]').type(this.user.password, { force: true });
    cy.get('.btn--login').click({ force: true });
    cy.url().should('include', '/');

    cy.get('.navbar-link').contains('My Engagements').click();
    cy.url().should('include', `${baseUrlFrontend}/overview/my-engagements`);
    cy.get('.views-container').should('have.css', 'padding', '15px');
    cy.get('.views-container__arrow').click({ force: true });
    cy.get('.views-container').should('have.css', 'padding', '0px');
    cy.get('.views-container__arrow').click({ force: true });
    cy.wait(2000);
    cy.get(".views-container__list__item").eq(1).click({ force: true });
    cy.wait(2000);
    cy.url().should('include', `${baseUrlFrontend}/workflow/t2`);
    cy.wait(2000);
    cy.get(".views-container__list__item").eq(2).click({ force: true });
    cy.wait(4000);

    cy.get('div').contains('Total Engagements: ').invoke('text').then((text) => {
      const totalEngagements = parseInt(text.slice(18).trim(), 10);
      cy.get('.list-column--xs').filter(':contains("Team A")').should('have.length', totalEngagements);
    });

    cy.get('.container-add').eq(1).click({ force: true });
  });
});