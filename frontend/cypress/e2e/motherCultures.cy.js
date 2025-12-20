describe('MotherCulturesList', () => {
  it('should show the mother cultures', () => {
    cy.intercept(
      'GET',
      'http://localhost:3000/mother-cultures',
      {fixture: 'motherCultures.json'},
    );

    cy.login('davidjacob.bjj@gmail.com', '12345678');
    cy.visit('http://localhost:5173/mother-cultures');

    cy.get('[data-cy^="mother_cultures_row_"]').should('have.length', 3);
    
    cy.get('[data-cy="mother_cultures_row_1"]').should('contain', 'Lions Mane');
    cy.get('[data-cy="mother_cultures_row_2"]').should('contain', 'Blue Oyster');
    cy.get('[data-cy="mother_cultures_row_3"]').should('contain', 'Chestnut');
  });
});