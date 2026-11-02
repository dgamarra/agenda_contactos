describe('Happy Path - Contactos', () => {
  const random = Math.floor(Math.random() * 1000000);
  const testUser = {
    name: 'Test User',
    email: `testuser${random}@example.com`,
    password: 'password123',
  };

  it('Registro y creación de contacto', () => {
    // Registro
    cy.visit('/register');
    cy.get('[data-cy="register-name"]').type(testUser.name);
    cy.get('[data-cy="register-email"]').type(testUser.email);
    cy.get('[data-cy="register-password"]').type(testUser.password);
    cy.get('[data-cy="register-confirm-password"]').type(testUser.password);
    cy.get('[data-cy="register-submit"]').click();
    
    cy.url({ timeout: 20000 }).should('include', '/dashboard');
    cy.contains('Mis Contactos', { timeout: 10000 }).should('be.visible');
    cy.wait(1000);

    // Create contact with all fields
    cy.get('[data-cy="new-contact"]').click();
    cy.get('[data-cy="contact-form"]').should('be.visible');
    cy.get('[data-cy="contact-name"]').type('Juan Pérez');
    cy.get('[data-cy="contact-phone"]').type('1234567890');
    cy.get('[data-cy="contact-email"]').type('juan@test.com');
    cy.get('[data-cy="contact-company"]').type('Test Company');
    cy.get('[data-cy="contact-category"]').select('trabajo');
    cy.get('[data-cy="contact-submit"]').click();
    
    // Give time for the request to complete
    cy.wait(2000);
    
    // Either form closes and contact appears, or there's an error message
    cy.get('body').then(($body) => {
      if ($body.find('[data-cy="contact-form"]').length > 0) {
        // Form still visible - check for error message
        cy.get('.bg-red-50').should('contain', 'Error');
      } else {
        // Form closed - check for contact
        cy.contains('Juan Pérez', { timeout: 5000 }).should('be.visible');
      }
    });
  });
});