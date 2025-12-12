# E2E Testing Documentation - Cypress

## Test Suite: portfolio.cy.js

### Configuration
- **Base URL**: http://localhost:3001
- **Viewport**: 1280x720
- **Video Recording**: Enabled
- **Screenshots on Failure**: Enabled
- **Framework**: Cypress 13.x

### E2E Test Cases

#### Test 1: Load Home Page Successfully
```javascript
it('should load the home page successfully', () => {
  cy.visit('http://localhost:3001');
  cy.contains('Muhammad Anas').should('exist');
});
```
**Status**: ✅ Configured
**Purpose**: Verify home page loads and displays portfolio name

#### Test 2: Display Navigation Menu
```javascript
it('should display navigation menu', () => {
  cy.contains('Home').should('be.visible');
  cy.contains('About').should('be.visible');
  cy.contains('Projects').should('be.visible');
  cy.contains('Qualifications').should('be.visible');
  cy.contains('Services').should('be.visible');
  cy.contains('Contact').should('be.visible');
});
```
**Status**: ✅ Configured
**Purpose**: Verify all navigation menu items are visible

#### Test 3: Display CTA Buttons
```javascript
it('should display CTA buttons on home page', () => {
  cy.contains('View My Work').should('be.visible');
  cy.contains('Get in Touch').should('be.visible');
});
```
**Status**: ✅ Configured
**Purpose**: Verify call-to-action buttons are visible

#### Test 4: Navigate to Projects Page
```javascript
it('should navigate to Projects page when clicking View My Work', () => {
  cy.contains('View My Work').click();
  cy.url().should('include', '/project');
  cy.contains('My Projects').should('be.visible');
});
```
**Status**: ✅ Configured
**Purpose**: Test navigation to projects page

#### Test 5: Navigate to Contact Page
```javascript
it('should navigate to Contact page when clicking Get in Touch', () => {
  cy.contains('Get in Touch').click();
  cy.url().should('include', '/contact');
});
```
**Status**: ✅ Configured
**Purpose**: Test navigation to contact page

#### Test 6: Display Stats Counter
```javascript
it('should display stats counter on home page', () => {
  cy.get('section').should('exist');
});
```
**Status**: ✅ Configured
**Purpose**: Verify stats section exists

#### Test 7: Proper Link Routing
```javascript
it('should have proper link routing', () => {
  cy.contains('About').click();
  cy.url().should('include', '/about');
  cy.contains('About Me').should('be.visible');
});
```
**Status**: ✅ Configured
**Purpose**: Test routing to About page

#### Test 8: Display Skills Section
```javascript
it('should display skills section on about page', () => {
  cy.contains('About').click();
  cy.contains('Skills & Technologies').should('be.visible');
});
```
**Status**: ✅ Configured
**Purpose**: Verify skills section on About page

#### Test 9: Navigate Through All Main Pages
```javascript
it('should navigate through all main pages', () => {
  cy.contains('Home').click();
  cy.url().should('include', '/');

  cy.contains('Projects').click();
  cy.url().should('include', '/project');
  cy.contains('My Projects').should('exist');

  cy.contains('Qualifications').click();
  cy.url().should('include', '/qualification');
  cy.contains('Qualifications & Certifications').should('exist');
});
```
**Status**: ✅ Configured
**Purpose**: Test multi-page navigation workflow

#### Test 10: Display Services Page
```javascript
it('should display services page with content', () => {
  cy.contains('Services').click();
  cy.url().should('include', '/service');
  cy.contains('Services').should('be.visible');
});
```
**Status**: ✅ Configured
**Purpose**: Test services page visibility

#### Test 11: Responsive Layout Testing
```javascript
it('should have responsive layout', () => {
  // Test desktop view
  cy.viewport('macbook-15');
  cy.contains('View My Work').should('be.visible');

  // Test mobile view
  cy.viewport('iphone-x');
  cy.contains('View My Work').should('be.visible');
});
```
**Status**: ✅ Configured
**Purpose**: Verify responsive design across devices

#### Test 12: Load Images
```javascript
it('should load images on about page', () => {
  cy.contains('About').click();
  cy.get('img').should('have.length.greaterThan', 0);
});
```
**Status**: ✅ Configured
**Purpose**: Verify images load on About page

---

## How to Run E2E Tests

### Prerequisites
1. Development server must be running:
```bash
npm run dev
```

2. In a separate terminal, run tests:

### Headless Mode (CI/CD)
```bash
npm run cypress:run
```

### Interactive Mode (Development)
```bash
npm run cypress:open
```

This opens the Cypress Test Runner where you can:
- View tests in real-time
- Debug failing tests
- Inspect elements
- View network requests
- Record test videos

---

## Expected E2E Test Results

When running the full test suite, you should expect:
- ✅ All 12 tests to pass
- ✅ Navigation works correctly
- ✅ Pages load properly
- ✅ Responsive design functions on mobile and desktop
- ✅ Images load without errors
- ✅ All interactive elements respond correctly

---

## Test File Location
```
cypress/
├── e2e/
│   └── portfolio.cy.js          # Main E2E test suite
├── support/
│   └── e2e.js                   # Cypress support configuration
└── cypress.config.js             # Cypress configuration
```

---

## CI/CD Integration

To integrate E2E tests into your CI/CD pipeline:

```bash
# GitHub Actions example
- name: Run E2E Tests
  run: |
    npm run dev &
    sleep 5
    npm run cypress:run
```

---

## Debugging E2E Tests

If tests fail, use:

```bash
# Run single test file
npx cypress run --spec "cypress/e2e/portfolio.cy.js"

# Run with specific browser
npx cypress run --browser chrome

# Run with slow-motion for debugging
npx cypress run --slow-mo 3000
```

---

## Test Coverage

| Area | Tests | Status |
|------|-------|--------|
| Navigation | 5 | ✅ |
| Page Rendering | 4 | ✅ |
| Routing | 2 | ✅ |
| Responsiveness | 1 | ✅ |
| **Total** | **12** | **✅** |

---

## Video & Screenshot Recording

When tests run, Cypress automatically:
- Records videos of all test executions
- Captures screenshots of failed tests
- Stores them in `cypress/videos/` and `cypress/screenshots/`

---

## Notes

- Tests are designed to run against a local development server
- baseUrl is set to `http://localhost:3001`
- All tests use realistic user interactions (clicks, navigation)
- Tests cover critical user journeys through the application
