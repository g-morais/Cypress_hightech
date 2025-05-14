describe('Acesso ao Swaglabs', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/')
    cy.get('[data-test="username"]').type('problem_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
  })

  it('Deve exibir a página de produtos após o login', () => {
    cy.contains('Products').should('be.visible')
  })

  it('Deve adicionar um produto ao carrinho', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('.shopping_cart_badge').should('contain', '1')
  })

  it('Deve abrir o carrinho com o produto adicionado', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('.shopping_cart_badge').click()
    cy.get('.cart_item').should('have.length', 1)
    cy.contains('Sauce Labs Backpack').should('be.visible')
  })

  it('Deve remover o produto do carrinho', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('.shopping_cart_badge').click()
    cy.get('[data-test="remove-sauce-labs-backpack"]').click()
    cy.get('.cart_item').should('not.exist')
  })

  it('Deve acessar os detalhes de um produto', () => {
    cy.contains('Sauce Labs Backpack').click()
    cy.get('.inventory_details_name').should('contain', 'Sauce Labs Backpack')
    cy.get('.inventory_details_price').should('be.visible')
    cy.get('[data-test="back-to-products"]').click()
    cy.contains('Products').should('be.visible')
  })

  it('Deve completar uma compra com sucesso', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('.shopping_cart_badge').click()
    cy.get('[data-test="checkout"]').click()
    cy.get('[data-test="firstName"]').type('João')
    cy.get('[data-test="lastName"]').type('Silva')
    cy.get('[data-test="postalCode"]').type('12345')
    cy.get('[data-test="continue"]').click()
    cy.get('[data-test="finish"]').click()
    cy.contains('Thank you for your order!').should('be.visible')
  })

  it('Deve fazer logout com sucesso', () => {
    cy.get('#react-burger-menu-btn').click()
    cy.get('#logout_sidebar_link').should('be.visible').click()
    cy.url().should('include', 'saucedemo.com')
    cy.get('[data-test="login-button"]').should('be.visible')
  })
})
