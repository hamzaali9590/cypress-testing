// Engagement Page Test Suite

describe('The Engagement Page', () => {
  // Constants
  const userName = 'hamza.ali@srjca.com';
  const password = 'password';
  let workflow = 'T3';
  const loginUrl = 'http://localhost:3000/login';
  const baseUrl = `http://localhost:3000/workflow/${workflow.toLowerCase()}`;

  // Login Function
  function login() {
    cy.visit(loginUrl, { failOnStatusCode: false });
    cy.get('form');
    cy.get('input[type=text]').type(userName, { force: true });
    cy.get('input[type=password]').type(password, { force: true });
    cy.get('.btn--login').click({ force: true });
    cy.url().should('include', '/');
    cy.wait(4000);
    cy.get('.navbar-link').contains(workflow).click({ force: true });
    cy.url().should('include', baseUrl);
  }

  // Test Suite
  it('Logins user and tests engagement page', () => {
    login();

    // Test engagement page
    cy.get('.views-container').should('have.css', 'padding', '15px');
    cy.get('.views-container__arrow').click({ force: true });
    cy.get('.views-container').should('have.css', 'padding', '0px');
    cy.get('.views-container__arrow').click({ force: true });
    cy.wait(2000);
    cy.get(".views-container__list__item").eq(2).click({ force: true });
    cy.wait(10000);

    // Test filter functionality
    cy.get('div').contains('Total Engagements: ').invoke('text').then((text) => {
      const totalEngagements = parseInt(text.slice(18).trim(), 10);
      cy.get('.list-column--xs').filter(':contains("Team A")').should('have.length', totalEngagements);
    });

    // Date filter
    cy.get('.container-add').eq(1).click({ force: true });
    cy.wait(4000)
    cy.get('.pill').eq(4).click({ force: true }).scrollIntoView();
    cy.get('.btn').contains('Apply').click({ force: true });

    // Due Date selector
    cy.get('.container-add').eq(1).click({ force: true });
    cy.get('.pill').eq(9).click({ force: true }).scrollIntoView();
    cy.get('.rdrDayNumber').eq(-50).click({ force: true });
    cy.get('.rdrDayNumber').eq(-25).click({ force: true });
    cy.get('.btn').contains('Apply').click({ force: true });

    // Year end selector
    cy.get('.container-add').eq(1).click({ force: true });
    cy.get('.pill').eq(14).click({ force: true }).scrollIntoView();
    cy.get('.rdrDayNumber').eq(-50).click({ force: true });
    cy.get('.rdrDayNumber').eq(-25).click({ force: true });
    cy.get('.btn').contains('Apply').click({ force: true });

    // Users filter applied
    cy.get(".views-container__list__item").eq(1).click({ force: true });
    cy.get('.container-add').eq(1).click({ force: true });
    cy.get('.engagement-filter-modal__menu__item').eq(1).click({ force: true });
    cy.wait(4000);
    cy.get('.search-field__input').click({ force: true }).type('a', { force: true });
    cy.wait(4000);
    cy.get('.search-field__list__item').eq(3).click({ force: true });
    cy.get('.btn').contains('Apply').click({ force: true });

    // Team filter applied
    cy.get(".views-container__list__item").eq(1).click({ force: true });
    cy.get('.container-add').eq(1).click({ force: true });
    cy.get('.engagement-filter-modal__menu__item').eq(2).click({ force: true });
    cy.wait(4000)
    cy.get('.search-field__input').click({ force: true }).type('a', { force: true });
    cy.wait(4000)
    cy.get('.search-field__list__item').eq(2).click({ force: true });
    cy.get('.btn').contains('Apply').click({ force: true });

    // Status filter view
    cy.get(".views-container__list__item").eq(1).click({ force: true });
    cy.get('.container-add').eq(1).click({ force: true });
    cy.get('.engagement-filter-modal__menu__item').eq(3).click({ force: true });
    cy.get('.search-field__input').eq(0).click({ force: true });

  })
  })