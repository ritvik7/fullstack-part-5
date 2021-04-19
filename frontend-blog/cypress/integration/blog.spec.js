import { create } from "../../../backend-blog/models/blog"

let testUser

function createBlog({author, url, title}) {
    cy.get('#title').type(title)
    cy.get('#author').type(author)
    cy.get('#url').type(url)
    cy.get('#blog-form').submit()
}

describe('When logged in', function() {
    before(function () {
        cy.request('POST', 'http://localhost:3000/api/testing/reset')
        testUser = {username: 'testUser', password: 'test'}
        cy.request('POST', 'http://localhost:3000/api/users', testUser)
    })

    beforeEach(function() {
        cy.clearLocalStorage()
        cy.login(testUser)
    })

    // it('A blog can be created', function() {
    //     cy.get('#create-blog').click()
    //     cy.get('#title').type('Test title')
    //     cy.get('#author').type('Test author')
    //     cy.get('#url').type('testurl.com')
    //     cy.get('#blog-form').submit()
    //     cy.get('.blog-default').should('contain', 'Test title')
    // })

    // it('Blog can be liked', function() {
    //     cy.contains('Test title').find('#view-button').click()
    //     cy.contains('likes 0')
    //     cy.find('#like-button').click()
    //     cy.wait(500)
    //     cy.contains('likes 1')
    // })

    // it('Blog cannot be deleted by non-creator', function() {

    //     const notCreator = {username: 'notCreator', password: 'test'}
    //     cy.request('POST', 'http://localhost:3000/api/users', notCreator)
    //     cy.contains('log out').click()
    //     cy.login(notCreator)

    //     cy.contains('Test title').find('#view-button').click()
    //     cy.get('#remove-button').should('not.exist')
    // })

    // it('Blog can only be deleted by creator', function() {
        
    //     cy.contains('Test title').find('#view-button').click()
    //     cy.get('#remove-button').click()
    //     cy.contains('Test title').should('not.exist')
    // })

    describe('When multiple blogs created and liked', function() {
        let blog1, blog2, blog3
        before(function() {
            cy.login(testUser)
            blog1 = {title: 'title1', author: 'author1', url: 'url1.com'}
            blog2 = {title: 'title2', author: 'author2', url: 'url2.com'}
            blog3 = {title: 'title3', author: 'author3', url: 'url3.com'}
            cy.get('#create-blog').click()
            createBlog(blog1)
            cy.wait(2000)
            createBlog(blog2)
            cy.wait(2000)
            createBlog(blog3)
            cy.wait(2000)
            
            
            cy.contains(blog1.title).find('#view-button').click()
            cy.contains(blog1.title).parent().find('#like-button').click()
            cy.wait(1000)

            cy.contains(blog2.title).find('#view-button').click()
            cy.contains(blog2.title).parent().find('#like-button').click()
            cy.wait(1000)
            cy.contains(blog2.title).parent().find('#like-button').click()
            cy.wait(1000)

            cy.contains(blog3.title).find('#view-button').click()
            cy.contains(blog3.title).parent().find('#like-button').click()
            cy.wait(1000)            
            cy.contains(blog3.title).parent().find('#like-button').click()
            cy.wait(1000)
            cy.contains(blog3.title).parent().find('#like-button').click()
            cy.wait(1000)
        })

        it('Blogs are sorted by likes', function() {
            cy.wait(2000)
            cy.get('.blog-default').each(($el, i, $list) => {
                cy.wrap($el).parent().find('.blog-details').contains(`likes ${3-i}`)
                
            })
        })
    })
})