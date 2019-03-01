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
    });

  context('Form submission', () => {
    it('Add new todo item to the list', () => {
      const todoText = 'Create project on Studies';
      cy.server();
      cy.route('POST', '/api/todos', {
        name: todoText,
        id: 1,
        isComplete: false
      });

      cy.get('.new-todo')
        .type(todoText)
        .type('{enter}')
        .should('have.value', '');
      cy.get('.todo-list li')
        .should('have.length', 1)
        .and('contain', todoText)
    });

    it.only('Show error when server response is 500', () => {
      cy.server();
      cy.route({
        url: '/api/todos',
        status: 500,
        method: 'POST',
        response: {}
      });

      cy.get('.new-todo')
        .type('test{enter}');

      cy.get('.todo-list li')
        .should('not.exist');

      cy.get('.error')
        .should('be.visible')
    })
  })
});