describe('SpeciesList', () => {
  it('should show the species', () => {
    cy.intercept(
      'GET',
      'http://localhost:3000/api/species',
      {fixture: 'species.json'},
    );

    cy.login('davidjacob.bjj@gmail.com', '12345678');
    cy.visit('http://localhost:5173/species');

    cy.get('[data-cy^="species_row_"]').should('have.length', 3);
    
    cy.get('[data-cy="species_row_1"]').should('contain', 'Lions Mane');
    cy.get('[data-cy="species_row_2"]').should('contain', 'Blue Oyster');
    cy.get('[data-cy="species_row_3"]').should('contain', 'Chestnut');
  });
});