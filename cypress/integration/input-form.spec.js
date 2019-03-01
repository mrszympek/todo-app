describe('Input form', () => {
    it('should focus input on load page', () => {
        cy.visit('http://localhost:3030');
        cy.focused()
            .should('have.class', 'new-todo')
    });

    it('Accept input', () => {
        const inputText = 'Buy some chips';

        cy.visit('http://localhost:3030');
        cy.get('.new-todo')
            .type(inputText)
            .should('have.value', inputText)
    })
});