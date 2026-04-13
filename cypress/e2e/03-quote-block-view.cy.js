import { slateBeforeEach, slateAfterEach } from '../support/e2e';

describe('Quote Block: View Mode Tests', () => {
  beforeEach(slateBeforeEach);
  afterEach(slateAfterEach);

  it('Quote Block: Add and save', () => {
    cy.clearSlateTitle();
    cy.getSlateTitle().type('Quote View Test');
    cy.get('.documentFirstHeading').contains('Quote View Test');

    cy.getSlate().click();

    // Add quote block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Text').click();
    cy.get('.content.active.text .button.quote')
      .contains('Quote')
      .click({ force: true });

    cy.get('.block.quote').should('exist');

    // Save
    cy.get('#toolbar-save').click();

    cy.contains('Quote View Test');
    cy.get('.block.quote').should('exist');
  });

  it('Quote Block: Add quote with text', () => {
    cy.clearSlateTitle();
    cy.getSlateTitle().type('Quote Text Test');

    cy.getSlate().click();

    // Add quote block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Text').click();
    cy.get('.content.active.text .button.quote')
      .contains('Quote')
      .click({ force: true });

    // Type in quote
    cy.get('.block.quote [contenteditable=true]').first().type('This is a quote');

    // Save
    cy.get('#toolbar-save').click();
    cy.contains('Quote Text Test');
  });

  it('Quote Block: Right aligned quote', () => {
    cy.clearSlateTitle();
    cy.getSlateTitle().type('Quote Right Align');

    cy.getSlate().click();

    // Add quote block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Text').click();
    cy.get('.content.active.text .button.quote')
      .contains('Quote')
      .click({ force: true });

    // Type in quote
    cy.get('.block.quote [contenteditable=true]').first().type('Right aligned quote');

    // Save
    cy.get('#toolbar-save').click();
    cy.contains('Quote Right Align');
  });
});