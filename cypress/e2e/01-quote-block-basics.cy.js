import { slateBeforeEach, slateAfterEach } from '../support/e2e';

describe('Blocks Tests', () => {
  beforeEach(slateBeforeEach);
  afterEach(slateAfterEach);

  it('Add Block: Quote', () => {
    // Change page title
    cy.clearSlateTitle();
    cy.getSlateTitle().type('Volto Quote Block Demo');

    cy.get('.documentFirstHeading').contains('Volto Quote Block Demo');

    cy.getSlate().click();

    // Add block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Text').click();
    cy.get('.content.active.text .button.quote')
      .contains('Quote')
      .click({ force: true });

    cy.get('.quote div[role="textbox"]')
      .click()
      .type('lorem ipsum dolor sit amet');

    // Save
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/cypress/my-page');

    // then the page view should contain our changes
    cy.contains('Volto Quote Block Demo');
    cy.get('.quote').contains('lorem ipsum dolor sit amet');
  });
});
