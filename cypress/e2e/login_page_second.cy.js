describe('Login Backend Authentication', () => {
  const loginUrl = 'http://localhost:5001/api/user/login';

  it('returns 401 Unauthorized with invalid credentials', () => {
    cy.request({
      method: 'POST',
      url: loginUrl,
      body: {
        email: 'invalidUser@email.com',
        password: 'invalidPassword'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.equal(401);
      expect(response.statusText).to.equal('Unauthorized');
    });
  });

  it('returns 200 authorized with valid credentials', () => {
    cy.request({
      method: 'POST',
      url: loginUrl,
      body: {
        email: 'hamza.ali@srjca.com',
        password: 'password'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.statusText).to.equal('OK');
    });
  });
});

describe('Login Frontend Authentication', () => {
  const loginPageUrl = 'http://localhost:3000/login';

  it('successfully logs in user and verifies auth token and user data', () => {
    const email = 'hamza.ali@srjca.com';
    const password = 'password';

    cy.visit(loginPageUrl, { failOnStatusCode: false });
    cy.get('form');
    cy.get('input[type=text]').type(email, { force: true });
    cy.get('input[type=password]').type(password, { force: true });
    cy.get('.btn--login').click({ force: true });

    cy.wait(5000);
    cy.url().should('not.include', "login");

    cy.getAllLocalStorage().then((result) => {
      const jsonString = result['http://localhost:3000'].workflow_user;
      const userData = JSON.parse(jsonString);
      expect(userData).to.have.property('auth_token');
      expect(userData.auth_token).not.to.be.null;
      expect(userData.id).to.equal(102);
      expect(userData.email).to.equal("hamza.ali@srjca.com");
    });
  });

  it('User login with invalid credentials', () => {
    const email = 'invalidUser';
    const password = 'invalidPassword';

    cy.visit(loginPageUrl, { failOnStatusCode: false });
    cy.get('form');
    cy.get('input[type=text]').type(email, { force: true });
    cy.get('input[type=password]').type(password, { force: true });
    cy.get('.btn--login').click({ force: true });
  });
});