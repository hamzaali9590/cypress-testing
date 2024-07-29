// cypress/integration/login.spec.js
/// <reference types="cypress" />

describe('Login Page', () => {

  beforeEach(() => {
    cy.visit(Cypress.config().frontendBaseUrl + '/login');

    cy.window().then((win) => {
      win.document.body.style.zoom = '100%';
      expect(win.document.body.style.zoom).to.equal('100%');
    });
  });

  it('should display the login form', () => {
    cy.get('.login-container').should('be.visible');
    cy.get('.login-form-container').should('be.visible');
    cy.get('.login-password-field').should('be.visible');
    cy.get('.login-email-field').should('be.visible');
    cy.get('.btn--login').should('be.visible',);
  });

  it('should login successfully with valid credentials', () => {
    cy.fixture('login').then((loginValues) => {
      cy.get('.login-email-field').type(loginValues.validEmail);
      cy.get('.login-password-field').type(loginValues.validPassword);
      cy.get('.btn--login').click();

      cy.contains(loginValues.validLoginMessage).should('be.visible');

      cy.url().should('eq', Cypress.config().frontendBaseUrl + '/');

      cy.getAllLocalStorage().then((result) => {
        const jsonString = result[Cypress.config().frontendBaseUrl].workflow_user;
        const userData = JSON.parse(jsonString);
        expect(userData).to.have.property(loginValues.tokenName);
        expect(userData.auth_token).not.to.be.null;
        expect(userData.id).to.equal(loginValues.validUserId);
        expect(userData.email).to.equal(loginValues.validEmail);
      });

      cy.wait(5000);
    });
  });

  it('should show an error message with invalid password', () => {
    cy.fixture('login').then((loginValues) => {
      cy.get('.login-email-field').type(loginValues.validEmail);
      cy.get('.login-password-field').type(loginValues.invalidPassword);
      cy.get('.btn--login').click();

      cy.contains(loginValues.invalidLoginMessage).should('be.visible');
      cy.wait(3000);
    });
  });

  it('should show an error message with invalid credentials', () => {
    cy.fixture('login').then((loginValues) => {
      cy.get('.login-email-field').type(loginValues.doesNotExistEmail);
      cy.get('.login-password-field').type(loginValues.invalidPassword);
      cy.get('.btn--login').click();

      cy.contains(loginValues.invalidLoginMessage).should('be.visible');
      cy.wait(3000);
    });
  });

  it('should show an error message with empty password', () => {
    cy.fixture('login').then((loginValues) => {
      cy.get('.login-email-field').type(loginValues.validEmail);

      cy.get('.btn--login').click();

      cy.contains(loginValues.invalidLoginMessage).should('be.visible');
      cy.wait(3000);
    });
  });

  it('should show an error message with empty email', () => {
    cy.fixture('login').then((loginValues) => {
      cy.get('.login-password-field').type(loginValues.validPassword);
      cy.get('.btn--login').click();

      cy.contains(loginValues.invalidLoginMessage).should('be.visible');
      cy.wait(3000);
    });
  });

  it('should show an error for invalid email format', () => {
    cy.fixture('login').then((loginValues) => {
      cy.get('.login-email-field').type(loginValues.invalidEmail);
      cy.get('.login-password-field').type(loginValues.validPassword);
      cy.get('.btn--login').click();

      cy.contains(loginValues.invalidEmailMessage).should('be.visible');
    });

  });

});


describe('Login Backend Authentication', () => {
  const loginUrl = Cypress.config().backendBaseUrl + '/api/user/login';

  it('returns 401 Unauthorized with invalid credentials', () => {
    cy.fixture('login').then((loginValues) => {
      cy.request({
        method: 'POST',
        url: loginUrl,
        body: {
          email: loginValues.doesNotExistEmail,
          password: loginValues.invalidPassword
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.equal(401);
        expect(response.statusText).to.equal('Unauthorized');
      });
    });
  });

  it('returns 200 authorized with valid credentials', () => {
    cy.fixture('login').then((loginValues) => {
      cy.request({
        method: 'POST',
        url: loginUrl,
        body: {
          email: loginValues.validEmail,
          password: loginValues.validPassword
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.statusText).to.equal('OK');
      });
    });
  });
});

