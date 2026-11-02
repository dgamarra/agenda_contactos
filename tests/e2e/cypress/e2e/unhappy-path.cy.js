describe('Unhappy Path - Validaciones', () => {
  it('Unhappy Path: Email inválido', () => {
    cy.visit('/register');
    cy.get('[data-cy="register-name"]').type('Test User');
    cy.get('[data-cy="register-email"]').type('invalid-email');
    cy.get('[data-cy="register-password"]').type('password123');
    cy.get('[data-cy="register-confirm-password"]').type('password123');
    cy.get('[data-cy="register-submit"]').click();
    cy.contains('Email inválido', { timeout: 5000 }).should('be.visible');
  });

  it('Unhappy Path: Formulario de registro vacío', () => {
    cy.visit('/register');
    cy.get('[data-cy="register-submit"]').click();
    cy.contains('El nombre es obligatorio', { timeout: 5000 }).should('be.visible');
  });

  it('Unhappy Path: Contraseñas no coinciden', () => {
    cy.visit('/register');
    cy.get('[data-cy="register-name"]').type('Test User');
    cy.get('[data-cy="register-email"]').type('test@example.com');
    cy.get('[data-cy="register-password"]').type('password123');
    cy.get('[data-cy="register-confirm-password"]').type('differentpassword');
    cy.get('[data-cy="register-submit"]').click();
    cy.contains('Las contraseñas no coinciden', { timeout: 5000 }).should('be.visible');
  });

  it('Unhappy Path: Contraseña muy corta', () => {
    cy.visit('/register');
    cy.get('[data-cy="register-name"]').type('Test User');
    cy.get('[data-cy="register-email"]').type('test@example.com');
    cy.get('[data-cy="register-password"]').type('123');
    cy.get('[data-cy="register-confirm-password"]').type('123');
    cy.get('[data-cy="register-submit"]').click();
    cy.contains('al menos 6 caracteres', { timeout: 5000 }).should('be.visible');
  });
});