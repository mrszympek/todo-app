describe('App initialization', () => {
  //test sprawdzajacy stan listy podczas inicjalizacji aplikacji
  it('Load todo list', () => {
    cy.seedAndVisit();

    cy.get('.todo-list li')
      .should('have.length', 4)
  });

  //test sprawdzajacy czy istnieje lista zadan, jezeli nie to sprawdza czy jest wyswietlany blad
  it('Displays an error on failure', () => {
    cy.server();
    cy.route({
      url: '/api/todos',
      method: 'GET',
      status: 500,
      response: {}
    });
    cy.visit('/');

    cy.get('.todo-list li')
      .should('not.exist');

    cy.get('.error')
      .should('be.visible')
  })
});