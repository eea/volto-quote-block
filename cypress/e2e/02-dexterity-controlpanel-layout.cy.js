import { slateLayoutBeforeEach, slateLayoutAfterEach } from '../support/e2e';

describe('ControlPanel: Dexterity Content-Types Layout', () => {
  beforeEach(slateLayoutBeforeEach);
  afterEach(slateLayoutAfterEach);

  it('Edit Blocks Layout for Book', () => {
    cy.visit('/controlpanel/dexterity-types');
    cy.waitForResourceToLoad('@navigation');
    cy.waitForResourceToLoad('@breadcrumbs');
    cy.waitForResourceToLoad('@actions');
    cy.waitForResourceToLoad('@types');

    cy.get('a[href="/controlpanel/dexterity-types/book"]').should(
      'have.text',
      'book',
    );

    cy.visit('/controlpanel/dexterity-types/book/layout');
    cy.get('#page-controlpanel-layout').contains(
      'Can not edit Layout for book',
    );
    cy.get('#page-controlpanel-layout button').click();

    // Wait a bit for draftjs to load, without this the title block
    // custom placeholder is missing and cypress gives a timeout error
    cy.wait(1000);
    cy.get('input[id="field-placeholder"]').type('Book title');
    cy.get('label[for="field-required"]').click();
    cy.get('label[for="field-fixed"]').click();

    cy.getSlate().click();

    // Add quote block with default variation
    cy.get('.ui.basic.icon.button.block-add-button:visible').click();
    cy.get('.blocks-chooser .title').contains('Text').click();
    cy.get('.content.active.text .button.quote')
      .contains('Quote')
      .click({ force: true });

    // Add quote block with testimonial quote variation
    cy.getSlate().click();
    cy.get('.ui.basic.icon.button.block-add-button:visible').click();
    cy.get('.blocks-chooser .title').contains('Text').click();
    cy.get('.content.active.text .button.quote')
      .contains('Quote')
      .click({ force: true });
    cy.get('#sidebar .formtabs').contains('Block').click();
    cy.get('.form .react-select-container').click();
    cy.get('.react-select__menu').contains('Testimonial quote').click();

    cy.get('#toolbar-save').click();

    cy.visit('/cypress');
    cy.waitForResourceToLoad('@navigation');
    cy.waitForResourceToLoad('@breadcrumbs');
    cy.waitForResourceToLoad('@actions');
    cy.waitForResourceToLoad('@types');

    cy.get('button[class="add"]').click();
    cy.get('#toolbar-add-book').click();
    cy.get('.block.title').contains('Book title');
    cy.get('.block-editor-quote').should('have.length', 2);

    // Change book title
    cy.clearSlateTitle();
    cy.getSlateTitle().type('My First Book');
    cy.get('.documentFirstHeading').contains('My First Book');

    cy.get('.block.quote:nth(1) div[role="textbox"]')
      .click()
      .type('My default quote');
    cy.get('.block.quote:nth(2) div[role="textbox"]')
      .click()
      .type('My testimonial quote');
    cy.get('.form .field-wrapper-image .input input')
      .click()
      .type(
        'https://eea.github.io/volto-eea-design-system/img/eea_icon.png{enter}',
      );
    cy.get('.form .field-wrapper-image .buttons .primary .icon').click();

    cy.get('#toolbar-save').click();
    cy.get('.documentFirstHeading').contains('My First Book');
    cy.get('.block-editor-quote').contains('My default quote');
    cy.get('.block-editor-quote').contains('My testimonial quote');
    cy.get('.testimonial .image img').should(
      'have.attr',
      'src',
      'https://eea.github.io/volto-eea-design-system/img/eea_icon.png',
    );
  });
});
