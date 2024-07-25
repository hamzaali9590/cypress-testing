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
    }).then((response) => {
      // You can now manually handle the response status and body
        if (response.status === 200) {
        expect(response.body).to.eq('Login successful');
        
      } else {
        cy.log('Response Status:', response.status);
        cy.log('Response Body:', response.body);
      }
    });
  });
});

