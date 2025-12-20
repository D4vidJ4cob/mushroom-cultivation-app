describe('MotherCulture CRUD', () => {
  beforeEach(() => {
    cy.login('davidjacob.bjj@gmail.com', '12345678');
    cy.visit('http://localhost:5173/mother-cultures/add');
  });

  it('should add a new mother culture', () => {
    cy.get('[data-cy="name_input"]').type('MC-004');
    cy.get('[data-cy="species_select"]').select('1'); // Lions Mane
    cy.get('[data-cy="inoculationDate_input"]').type('2025-01-20');
    cy.get('[data-cy="character_input"]').type('Strong growth pattern');
    cy.get('[data-cy="submit_motherCulture"]').click();
    
    cy.url().should('eq', 'http://localhost:5173/mother-cultures');
    cy.contains('MC-004').should('exist');
  });

  it('should delete a mother culture', () => {
    cy.visit('http://localhost:5173/mother-cultures');
    cy.get('[data-cy="delete_motherCulture_btn"]').eq(2).click();
  
    cy.get('[data-cy^="mother_cultures_row_"]').should('have.length', 3);
  });

  it('should show an error message for a duplicate name', () => {
    cy.get('[data-cy="name_input"]').type('MC-004');
    cy.get('[data-cy="species_select"]').select('1');
    cy.get('[data-cy="inoculationDate_input"]').type('2025-01-20');
    cy.get('[data-cy="submit_motherCulture"]').click();

    cy.contains('A mother culture with this name already exists').should('exist');  
  });
});