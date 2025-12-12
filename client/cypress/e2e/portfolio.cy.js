describe('Portfolio App - Home Page E2E Tests', () => {
  beforeEach(() => {
    // Visit the home page
    cy.visit('https://portfolio-rose-alpha-14.vercel.app/');
  });

  it('should load the home page successfully', () => {
    cy.contains('Muhammad Anas').should('exist');
  });

  it('should display navigation menu', () => {
    cy.contains('Home').should('be.visible');
    cy.contains('About').should('be.visible');
    cy.contains('Projects').should('be.visible');
    cy.contains('Qualifications').should('be.visible');
    cy.contains('Services').should('be.visible');
    cy.contains('Contact').should('be.visible');
  });

  it('should display CTA buttons on home page', () => {
    cy.contains('View My Work').should('be.visible');
    cy.contains('Get in Touch').should('be.visible');
  });

  it('should navigate to Projects page when clicking View My Work', () => {
    cy.contains('View My Work').click();
    cy.url().should('include', '/project');
    cy.contains('My Projects').should('be.visible');
  });

  it('should navigate to Contact page when clicking Get in Touch', () => {
    cy.contains('Get in Touch').click();
    cy.url().should('include', '/contact');
  });

  it('should display stats counter on home page', () => {
    // Check if stats container exists
    cy.get('section').should('exist');
  });

  it('should have proper link routing', () => {
    cy.contains('About').click();
    cy.url().should('include', '/about');
    cy.contains('About Me').should('be.visible');
  });

  it('should display skills section on about page', () => {
    cy.contains('About').click();
    cy.contains('Skills & Technologies').should('be.visible');
  });

  it('should navigate through all main pages', () => {
    // Home
    cy.contains('Home').click();
    cy.url().should('include', '/');

    // Projects
    cy.contains('Projects').click();
    cy.url().should('include', '/project');
    cy.contains('My Projects').should('exist');

    // Qualifications
    cy.contains('Qualifications').click();
    cy.url().should('include', '/qualification');
    cy.contains('Qualifications & Certifications').should('exist');
  });

  it('should display services page with content', () => {
    cy.contains('Services').click();
    cy.url().should('include', '/service');
    cy.contains('Services').should('be.visible');
  });

  it('should have responsive layout', () => {
    // Test desktop view
    cy.viewport('macbook-15');
    cy.contains('View My Work').should('be.visible');

    // Test mobile view
    cy.viewport('iphone-x');
    cy.contains('View My Work').should('be.visible');
  });

  it('should load images on about page', () => {
    cy.contains('About').click();
    cy.get('img').should('have.length.greaterThan', 0);
  });
});
