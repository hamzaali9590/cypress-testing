// Authenticates user with correct credentails on backend

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
    expect(response.status, 'status').to.equal(201)
    expect(response.body).to.deep.equal('Login successful')
  })
      cy.visit('http://localhost:3000')
    })
});


// Authenticates user with wrong credentails on backend 

// describe('The Login Page', () => {
//   it('login attempt with wrong credentials', () => {
//   cy.request({
//     method: 'POST',
//     url: 'http://localhost:3000/login',
//     body: {
//       userName: 'invalidUser',
//       password: 'wrongPassword'
//     },
//     failOnStatusCode: false 
//   }).then((response) => {
//     expect(response.status, 'status').to.equal(401)
//     expect(response.body).to.deep.equal('User name or password is not correct')
//   })
//     })
// });



// Authenticates user with correct credentails on frontend

// describe('The Login Page', () => {
//   it('Authentication successful', () => {
//       let userName = 'validUser';
//       let password = 'validPassword123';
//       cy.visit('http://localhost:5173/', {failOnStatusCode: false});
//       cy.get('form')
//       cy.get('input[class=inputUserNameField]').type(userName)      
//       cy.get('input[class=inputPasswordField]').type(password)
//       cy.get('input[type=submit]').click();
           
//       cy.url().should('include', '/dashboard')
//     })
// })



// Authenticates user with wrong credentails on frontend 
// describe('The Login Page', () => {
//   it('Authentication unsuccessful', () => {
//       cy.visit('http://localhost:5173/', {failOnStatusCode: false});
//       cy.get('form')
//       cy.get('input[class=inputUserNameField]').type('invalidUser')      
//       cy.get('input[class=inputPasswordField]').type('wrongPassword')
//       cy.get('input[type=submit]').click();
      
      
//       // cy.url().should('include', '/dashboard')
//     })
// })

