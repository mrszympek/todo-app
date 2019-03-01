describe('Input form', () => {
  // Before each wykonuje sie dla każdego it w danym kontekscie
  beforeEach(() => {
    cy.visit('http://localhost:3030');
  });

  // Sprawdzam czy input formularza istnieje na stronie
  it('should focus input on load page', () => {
    cy.focused()
      .should('have.class', 'new-todo')
  });

  // Sprawdam czy input przyjmuje value które wprowadzamy
  it('Accept input', () => {
    const inputText = 'Buy some chips';

    cy.get('.new-todo')
      .type(inputText)
      .should('have.value', inputText)
  });

  // Tworzenie nowego kontekstu dla sprawdzania formualrzy
  context('Form submission', () => {
    it('Add new todo item to the list', () => {
      const todoText = 'Create project on Studies';
      cy.server();
      // Tworzymy nowy obiekt z itemem i posylamy go postem na server pod adres /api/todos
      cy.route('POST', '/api/todos', {
        name: todoText,
        id: 1,
        isComplete: false
      });
      // Bierzemy selektor newtodo przekauzjemy my wartosc z zmiennej todoText i wysylamy w formlarzu, oczekujemy ze jeko value === todoText
      cy.get('.new-todo')
        .type(todoText)
        .type('{enter}')
        .should('have.value', '');
      // Bierzemy liste bierzemy liste i sprawdzamy czy element sie dodal, powinien zawiereac wartoc pola todoText
      cy.get('.todo-list li')
        .should('have.length', 1)
        .and('contain', todoText)
    });

    // Test sprawdzaajacy przypadek dostania z serwera 500, jezeli form wysle nowa wartosc ktora sie nie doda sprawdzamy czy error sie wyswietla
    it('Show error when server response is 500', () => {
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