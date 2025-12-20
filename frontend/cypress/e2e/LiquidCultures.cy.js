describe('LiquidCultureList', () => {
  it('should show the liquid cultures', () => {
    cy.intercept(
      'GET',
      'http://localhost:3000/liquid-cultures',
      {fixture: 'liquidCultures.json'},
    );

    cy.login('davidjacob.bjj@gmail.com', '12345678');
    cy.visit('http://localhost:5173/liquid-cultures');

    cy.get('[data-cy^="liquid_cultures_row_"]').should('have.length', 3);
    
    cy.get('[data-cy="liquid_cultures_row_1"]').should('contain', 'Lions Mane');
    cy.get('[data-cy="liquid_cultures_row_2"]').should('contain', 'Blue Oyster');
    cy.get('[data-cy="liquid_cultures_row_3"]').should('contain', 'Chestnut');
  });
});