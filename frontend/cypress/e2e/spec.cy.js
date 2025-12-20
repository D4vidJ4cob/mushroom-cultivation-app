describe('General', () => {
  it('Draait de applicatie?', () => {
    cy.visit('http://localhost:5173/');
    cy.get('div').should('contain', 'Species');
  });
  it('should login', () => {
    cy.login('davidjacob.bjj@gmail.com', '12345678');
  });
});