describe('The Login Page', () => {
  it('should authenticate user with valid credentials', () => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3000/login',
    body: {
      userName: 'validUser',
      password: 'validPassword123'
    },
    failOnStatusCode: false 
  })
      cy.visit('/')
    })
});
    
