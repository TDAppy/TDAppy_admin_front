describe('Navigate on all pages and add resource', () => {
  beforeEach(function () {
    cy.fixture('users').as('user');
  });

  it('login to admin dashboard', function () {
    cy.intercept('POST', `${Cypress.env('apiUrl')}/admin/auth/login`, {
      statusCode: 200,
      body: {
        auth_token: 'fake_jwt_token',
        role: 'ADMIN'
      }
    }).as('loginRequest');
    cy.visit('/');
    cy.contains('Connexion');
    cy.get('input[formControlName="identifier"]').type(this["user"].identifier);
    cy.get('input[formControlName="password"]').type(this["user"].password);
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest');
    cy.url().should('include', '/dashboard');
  });

  it('Visit all pages', () => {
    cy.window().then((win) => {
      win.localStorage.setItem('auth_token', 'fake_jwt_token');

      cy.intercept('GET', `${Cypress.env('apiUrl')}/admin/reports/reply`, {
        statusCode: 200,
        body: []
      }).as('getReportReplies');
      cy.intercept('GET', `${Cypress.env('apiUrl')}/admin/reports/topics`, {
        statusCode: 200,
        body: []
      }).as('getReportTopics');

      cy.intercept('GET', `${Cypress.env('apiUrl')}/admin/user?page=0&size=50`, {
        statusCode: 200,
        body: {
          content: [],
          totalElements: 0,
          totalPages: 0,
          page: 0
        }
      }).as('getUsersList');

      cy.intercept('GET', `${Cypress.env('apiUrl')}/admin/user/banned?page=0&size=50`, {
        statusCode: 200,
        body: {
          content: [],
          totalElements: 0,
          totalPages: 0,
          page: 0
        }
      }).as('getUsersBanned');

      cy.intercept('GET', `${Cypress.env('apiUrl')}/admin/topic?page=0&size=50`, {
        statusCode: 200,
        body: {
          content: [],
          totalElements: 0,
          totalPages: 0,
          page: 0
        }
      }).as('getForumsList');

      cy.intercept('GET', `${Cypress.env('apiUrl')}/admin/topic/deactivated?page=0&size=50`, {
        statusCode: 200,
        body: {
          content: [],
          totalElements: 0,
          totalPages: 0,
          page: 0
        }
      }).as('getForumsDeactivated');

      cy.intercept('GET', `${Cypress.env('apiUrl')}/admin/statistics/quiz`, {
        statusCode: 200,
        body: [{
          childrenLowSigns: 0,
          childrenModerateSigns: 0,
          childrenHighSigns: 0,
          adultsLowSigns: 0,
          adultsModerateSigns: 0,
          adultsHighSigns: 0
        }]
      }).as('getStatistics');

      cy.intercept('GET', `${Cypress.env('apiUrl')}/admin/resources/children`, {
        statusCode: 200,
        body: []
      }).as('getResources');

      cy.intercept('GET', `${Cypress.env('apiUrl')}/admin/resources/adults`, {
        statusCode: 200,
        body: []
      }).as('getResources');

    });

    cy.visit('/dashboard');
    cy.contains('Espace Admin');

    cy.get('a[href="/reports/users"]').first().
    click();
    cy.contains('utilisateurs signalés');
    cy.get('a[href="/reports/topics"]').first().
    click();
    cy.contains('topics signalés');

    cy.get('a[href="/users/list"]').first().
    click();
    cy.url().should('include', '/users/list');
    cy.get('a[href="/users/banned"]').first()
      .click();
    cy.url().should('include', '/users/banned');

    cy.get('a[href="/forums/list"]').first()
      .click();
    cy.url().should('include', '/forums/list');
    cy.get('a[href="/forums/deactivated"]').first()
      .click();
    cy.url().should('include', '/forums/deactivated');

    cy.get('a[href="/statistics"]').first()
      .click();
    cy.url().should('include', '/statistics');

    cy.get('a[href="/content/resources"]').first()
      .click();
    cy.url().should('include', '/content/resources');
  });

  it('Add resource', () => {
    cy.window().then((win) => {
      win.localStorage.setItem('auth_token', 'fake_jwt_token');

      cy.intercept('GET', `${Cypress.env('apiUrl')}/admin/resources/children`, {
        statusCode: 200,
        body: []
      }).as('getResources');

      cy.intercept('GET', `${Cypress.env('apiUrl')}/admin/resources/adults`, {
        statusCode: 200,
        body: []
      }).as('getResources');

      cy.intercept("POST", `${Cypress.env('apiUrl')}/admin/resources`, {
        statusCode: 201,
        body: {}
      }).as('addResource');
    });

    cy.visit('/content/resources');
    cy.get('button[type="button"]').contains('+')
      .click();
    cy.contains('Ajouter une ressource');

    cy.get('input[id="title"]').type('Titre de la ressource');
    cy.get('textarea[id="content"]').type('Contenu de la ressource');
    cy.get('input[id="urlImage"]').click();
    cy.get('select[id="type"]').select('ADMINISTRATIVE');
    cy.get('textarea[id="description"]').type('Description de la ressource');
    cy.get('input[id="reference"]').scrollIntoView().
    type('Référence de la ressource', { force: true });
    cy.get('select[id="theme"]').scrollIntoView().
    select('CHILDREN', { force: true });
    cy.get('button[type="button"]').contains("Ajouter").
    click({ force: true });
    cy.wait('@addResource');
  })
});
