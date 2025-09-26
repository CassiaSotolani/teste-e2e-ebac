///<reference types="cypress" >

import produtosPage from '../support/page_objects/produtos.page'

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
      Quero acessar a Loja EBAC 
      Para fazer um pedido de 4 produtos 
      Fazendo a escolha dos produtos
      Adicionando ao carrinho
      Preenchendo todas opções no checkout
      E validando minha compra ao final */

    beforeEach(() => {

        produtosPage.visitarUrl()

    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {

        cy.fixture('produtos').then( Produtos => {
            Produtos.forEach( produto => {
                produtosPage.visitarProduto(produto.nome)
                produtosPage.addProdutoCarrinho(produto.tamanho, produto.cor, produto.quantidade)
                cy.get('.woocommerce-message').should('exist')
                cy.get('.woocommerce-message > .button').should('contain', 'Ver carrinho')
            });
        })
        produtosPage.paginaCarrinho()
        produtosPage.paginaChechout()
        cy.fixture('perfil').then(( login => {
            cy.get('#username').type(login.usuario)
            cy.get('#password').type(login.senha, {log: false})
            cy.get('.woocommerce-button').click()
        }))
        cy.fixture('checkout').then( checkout => {
            cy.get('#billing_address_1').clear().type(checkout.endereco)
            cy.get('#billing_city').clear().type(checkout.cidade)
            cy.get('#select2-billing_state-container').type(checkout.estado).click()
            cy.get('#billing_postcode').clear().type(checkout.cep)
            cy.get('#billing_phone').clear().type(checkout.telefone)
            cy.get('#payment_method_cod').click()
            cy.get('#terms').click()
            cy.get('#place_order').click()
            cy.get('.woocommerce-notice', { timeout: 10000 } ).should('contain', 'Obrigado. Seu pedido foi recebido.')
        })
        
    })
})