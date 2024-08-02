describe('The Engagement Page', () => {
  const testUser = {
    username: 'hamza.ali@srjca.com',
    password: 'password',
  };

  const workflow = 'T3';
  const loginUrl = 'http://localhost:3000/login';
  const baseUrl = `http://localhost:3000/workflow/${workflow.toLowerCase()}`;

  beforeEach(() => {
    cy.visit(loginUrl, { failOnStatusCode: false });
    cy.login(testUser.username, testUser.password);
  });

  it('Logins user and performs various actions', () => {
    cy.url().should('not.include', 'login');
    cy.workflowSelector(workflow);
    cy.url().should('include', baseUrl);

    // Toggle views container padding
    cy.toggleViewsContainerPadding();

    // Select and count results of view container
    cy.selectAndCountResults();

    // Date filter
    cy.applyDateFilter();

    // Users filter
    cy.applyUsersFilter();

    // Teams filter
    cy.applyTeamsFilter();

    // Status filter view
    cy.applyStatusFilter();

    // Columns filter
    cy.applyColumnsFilter();

    // Create new filter
    cy.createNewFilter();

    // Reset all filters
    cy.workflowSelector('T2');
  });
});