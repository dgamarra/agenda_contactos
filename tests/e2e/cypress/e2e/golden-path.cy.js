describe('Golden Path - Flujo completo', () => {
  const random = Math.floor(Math.random() * 1000000);
  const user = {
    name: 'Golden User',
    email: `golden${random}@example.com`,
    password: 'password123',
  };

  it('Registro, crear, buscar y logout', () => {
    // 1. Registro
    cy.visit('/register');
    cy.get('[data-cy="register-name"]').type(user.name);
    cy.get('[data-cy="register-email"]').type(user.email);
    cy.get('[data-cy="register-password"]').type(user.password);
    cy.get('[data-cy="register-confirm-password"]').type(user.password);
    cy.get('[data-cy="register-submit"]').click();
    cy.url({ timeout: 20000 }).should('include', '/dashboard');
    cy.wait(1000);

    // 2. Crear contacto
    cy.get('[data-cy="new-contact"]').click();
    cy.get('[data-cy="contact-form"]').should('be.visible');
    cy.get('[data-cy="contact-name"]').type('Contacto Prueba');
    cy.get('[data-cy="contact-phone"]').type('1234567890');
    cy.get('[data-cy="contact-email"]').type('test@test.com');
    cy.get('[data-cy="contact-category"]').select('personal');
    cy.get('[data-cy="contact-submit"]').click();
    cy.wait(2000);
    
    cy.get('body').then(($body) => {
      if ($body.find('[data-cy="contact-form"]').length > 0) {
        cy.get('.bg-red-50').should('contain', 'Error');
      } else {
        cy.contains('Contacto Prueba', { timeout: 5000 }).should('be.visible');
      }
    });

    // 3. Buscar
    cy.get('[data-cy="search-input"]').type('Prueba');
    cy.contains('Contacto Prueba').should('be.visible');

    // 4. Logout
    cy.get('[data-cy="logout"]').click();
    cy.url().should('include', '/login');
  });
});