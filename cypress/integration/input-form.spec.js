describe('Input form', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3030');
    });

    it('should focus input on load page', () => {
        cy.focused()
            .should('have.class', 'new-todo')
    });

    it('Accept input', () => {
        const inputText = 'Buy some chips';

        cy.get('.new-todo')
            .type(inputText)
            .should('have.value', inputText)
    })
});