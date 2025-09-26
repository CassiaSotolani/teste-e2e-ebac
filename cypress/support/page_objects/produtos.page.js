class ProdutosPage {

    visitarUrl() {
        cy.visit('produtos/')
    }

    visitarProduto(nomeProduto) {
        cy.get('[name="s"]').eq(1).type(nomeProduto)
        cy.get('.button-search').eq(1).click()
    }

    addProdutoCarrinho(tamanho, cor, quantidade) {
        cy.get(`.button-variable-item-${tamanho}`).click()
        cy.get(`.button-variable-item-${cor}`).click()
        cy.get('.input-text').clear().type(quantidade)
        cy.get('.single_add_to_cart_button').click()
    }

    paginaCarrinho() {
        cy.visit('carrinho/')
        cy.get('.page-title').should('contain', 'Carrinho')
        cy.get('.cart_item').should('have.length', 4)
    }

    paginaChechout() {
        cy.visit('checkout/')
        cy.get('.page-title').should('contain', 'Checkout')
        cy.get('.woocommerce-billing-fields > h3').should('contain', 'Detalhes de faturamento')
        cy.get('#order_review_heading').should('contain', 'Your order')
        cy.get('.showlogin').click()
    }

}

export default new ProdutosPage();