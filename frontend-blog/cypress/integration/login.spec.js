let testUser

describe('Blog app', function(){
  before(function () {
    cy.request('POST', 'http://localhost:3000/api/testing/reset')
    testUser = {username: 'testUser', password: 'test'}
    cy.request('POST', 'http://localhost:3000/api/users', testUser)
  })

  beforeEach(function(){
    cy.clearLocalStorage()
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login', { matchCase: false })
  })

  it('Login success', function() {
    cy.get('#username').type(testUser.username)
    cy.get('#password').type(testUser.password)
    cy.get('#login').click()
    cy.contains(`${testUser.username} logged in`)
  })

  it('Login fail', function() {
    cy.get('#username').type('failuser')
    cy.get('#password').type('failpassword')
    cy.get('#login').click()
    cy.get('.fail').should('contain', 'invalid credentials').should('have.css', 'color', 'rgb(255, 0, 0)')

  })
})