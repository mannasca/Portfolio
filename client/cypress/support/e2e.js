// Cypress support file
// Load and register all hook implementations

Cypress.on('uncaught:exception', (err, runnable) => {
  // Prevent Cypress from failing the test
  return false;
});
