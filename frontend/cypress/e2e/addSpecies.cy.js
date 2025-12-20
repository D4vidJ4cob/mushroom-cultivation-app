describe('Species CRUD', () => {
  beforeEach(() => {
    cy.login('davidjacob.bjj@gmail.com', '12345678');
    cy.visit('http://localhost:5173/species/add');
  });

  it('should add a new species', () => {
    cy.get('[data-cy="name_input"]').type('New Test Species');
    cy.get('[data-cy="submit_species"]').click();
    
    cy.url().should('eq', 'http://localhost:5173/species');
    cy.contains('New Test Species').should('exist');
  });

  it('should delete a species', () => {
    cy.visit('http://localhost:5173/species');
    cy.get('[data-cy="delete_species_btn"]').eq(3).click();
  
    cy.get('[data-cy="species"]').should('have.length', 2);
  });

  it('should show an error message for a duplicate name'), () => {
    cy.login('davidjacob.bjj@gmail.com', '12345678');
    cy.visit('http://localhost:5173/species/add');
  
    cy.get('[data-cy="name_input"]').type('Lions Mane');
    cy.get('[data-cy="submit_species"]').click();

    cy.contains('A species with this name already exists');  
  };
});