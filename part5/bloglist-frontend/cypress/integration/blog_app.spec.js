describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user1 = {
      name: 'Olivier Abrivard',
      username: 'oabrivard',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user1)

    const user2 = {
      name: 'Francoise Forestier',
      username: 'fforestier',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user2)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('oabrivard')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.contains('Olivier Abrivard logged-in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('oabrivard')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('wrong credentials', { matchCase: false }).should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'oabrivard', password: 'password' })
    })

    it('A blog can be created', function () {
      cy.contains('create').click()
      cy.get('#title-input').type('a blog title')
      cy.get('#author-input').type('the blog author')
      cy.get('#url-input').type('the blog url')
      cy.contains('save').click()

      cy.contains('a blog title')
    })

    it('A blog can be deleted', function () {
      cy.createBlog({ title: 'blog to delete', author: 'author', url: 'url' })

      cy.contains('blog to delete')
        .contains('view')
        .click()
      cy.contains('delete')
        .click()

      cy.contains('blog to delete').should('not.exist')
    })

    it('A blog can be deleted but only by its creator', function () {
      cy.createBlog({ title: 'blog that is not owned', author: 'author', url: 'url' })

      cy.contains('logout')
        .click()

      cy.login({ username: 'fforestier', password: 'password' })

      cy.contains('blog that is not owned')
        .contains('view')
        .click()
      cy.contains('delete').should('not.exist')
    })

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'first blog', author: 'author 1', url: 'url 1' })
        cy.createBlog({ title: 'second blog', author: 'author 2', url: 'url 2' })
        cy.createBlog({ title: 'third blog', author: 'author 3', url: 'url 3' })
      })

      it('one of those can be liked', function () {
        cy.contains('second blog')
          .contains('view')
          .click()
        cy.contains('like')
          .click()

        cy.contains('second blog')
          .contains('likes 1')
      })

      it('they are ordered according to the number of likes', function () {
        cy.contains('third blog')
          .contains('view')
          .click()
        cy.contains('like')
          .click()
        cy.contains('third blog')
          .contains('like')
          .click()
        cy.contains('third blog')
          .contains('like')
          .click()
        cy.contains('second blog')
          .contains('view')
          .click()
        cy.contains('like')
          .click()
        cy.contains('second blog')
          .contains('like')
          .click()
        cy.contains('first blog')
          .contains('view')
          .click()
        cy.contains('like')
          .click()

        cy.get('.blog').eq(0).should('contain', 'third blog')
        cy.get('.blog').eq(1).should('contain', 'second blog')
        cy.get('.blog').eq(2).should('contain', 'first blog')
        cy.contains('second blog')
      })
    })
  })
})
