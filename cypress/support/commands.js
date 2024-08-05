Cypress.Commands.add('login', (username, password) => {
  cy.get('input[type=text]').type(username, { force: true });
  cy.get('input[type=password]').type(password, { force: true });
  cy.get('.btn--login').click({ force: true });
});

Cypress.Commands.add('clickElement', (selectorClass) => {
  return cy.get(selectorClass).click({ multiple: true, force: true }).wait(4000)
})

Cypress.Commands.add('selectAndClickElement', (selectorClass, ele) => {
  return cy.get(selectorClass).eq(ele).click({ force: true })
})

Cypress.Commands.add('clickApply', () => {
  return cy.get('.btn').contains('Apply').click({ force: true }).wait(6000)

})

Cypress.Commands.add('OpenEngagementFilterModel', () => {
  return cy.selectAndClickElement('.container-add', 1).wait(4000)
})

// this method would also be used to reset the filter as it opens the default view
Cypress.Commands.add('workflowSelector', (workflow) => {
  return cy.get('.navbar-link').contains(workflow).click({ force: true })

})


Cypress.Commands.add('countResults', () => {
  cy.get('body').then(($body) => {
    if ($body.find('div:contains("Total Engagements: ")').length > 0) {
      cy.get('div').contains('Total Engagements: ').invoke('text').then((text) => {
        const totalEngagements = parseInt(text.slice(18).trim(), 10);
        if (totalEngagements > 50) {
          cy.log(`${totalEngagements} Skipping countResults method as the total engagements exceed the count of 50`);
        } else {
          cy.get('.list-column--xxl').should('have.length', totalEngagements + 1);
        }
      });
    } else {
      cy.log('No results found!');
    }
  });
});

Cypress.Commands.add('filters', (filterName, itemIndex, searchText, removeBtnClass) => {
  cy.OpenEngagementFilterModel()
  cy.selectAndClickElement('.engagement-filter-modal__menu__item', itemIndex)
  if (filterName === 'status') {
    cy.clickElement('.search-field__input').wait(2000)
    cy.selectAndClickElement('.search-field__list__item', 2)
    cy.clickApply()
  }
  else {
    cy.clickElement('.search-field__input').type(searchText, { force: true }).wait(2000)
    cy.selectAndClickElement('.search-field__list__item', 2)
    cy.clickApply()
  }
  cy.countResults()
  cy.OpenEngagementFilterModel()
  cy.selectAndClickElement('.engagement-filter-modal__menu__item', itemIndex)
  cy.clickElement(removeBtnClass)
  cy.clickApply()
})



Cypress.Commands.add('toggleViewsContainerPadding', () => {
  cy.get('.views-container').should('have.css', 'padding', '15px');
  cy.clickElement('.views-container__arrow');
  cy.get('.views-container').should('have.css', 'padding', '0px');
  cy.clickElement('.views-container__arrow').wait(8000);
});

Cypress.Commands.add('selectAndCountResults', () => {
  cy.get('.views-container__list__item').each((ele) => {
    cy.clickElement(ele).wait(4000);
    cy.countResults('.list-column--xxl').wait(6000);
  });
});

Cypress.Commands.add('applyDateFilter', () => {
  cy.OpenEngagementFilterModel();
  cy.selectAndClickElement('.pill', 4).scrollIntoView();
  cy.get('.rdrDayNumber').eq(15).click({ force: true });
  cy.get('.rdrDayNumber').eq(-50).click({ force: true });
  cy.clickApply();
  cy.countResults();
});


Cypress.Commands.add('applyUsersFilter', () => {
  cy.workflowSelector('T2');
  cy.filters('users', 1, 'a', '.assigner__list__item__remove-btn__icon');
});

Cypress.Commands.add('applyTeamsFilter', () => {
  cy.workflowSelector('T2');
  cy.filters('teams', 2, 'c', '.assigned-team__item__action');
});

Cypress.Commands.add('applyStatusFilter', () => {
  cy.filters('status', 3, 'c', '.assigned_flow-type__item__action');
});

Cypress.Commands.add('applyColumnsFilter', () => {
  cy.OpenEngagementFilterModel();
  cy.selectAndClickElement('.engagement-filter-modal__menu__item', 4);
  cy.get('.pill').each((ele) => {
    cy.wrap(ele).click({ force: true });
  });
  cy.wait(4000);
  cy.clickApply();
  cy.countResults();
});

Cypress.Commands.add('createNewEngagement', () => {
  cy.selectAndClickElement('.container-add', 2);
  cy.selectAndClickElement('.search-field__input', 0);
  cy.selectAndClickElement('.search-field__list__item', 2);
  cy.clickElement('.new-engagement__settings__tasks__cta__button');
  cy.selectAndClickElement('.text-field-input', 1).type('Demo Task 3', { force: true })
  cy.clickElement('.search-field__input').wait(6000)
  cy.selectAndClickElement('.search-field__list__item', 10)
  cy.get('input[type="range"]').invoke('val', 50).trigger('input', { force: true }).trigger('change', { force: true });
  cy.get('.btn').contains('Create Task').click({ force: true })

  cy.selectAndClickElement('.tabs__item', 1)

  cy.selectAndClickElement('.search-field__input', 5).type('Hamza', { force: true }).wait(4000)
  cy.selectAndClickElement('.search-field__list__item', 0)
  cy.selectAndClickElement('.tabs__item', 2)
  cy.selectAndClickElement('.search-field__input', 1).type('Demo Engagement', { force: true }).wait(6000)
  cy.selectAndClickElement('.search-field__list__item', 0).wait(6000)

  cy.get('.btn').contains('Create').click({ force: true })

});

Cypress.Commands.add('collapseAllEngagements', () => {
  cy.wait(8000)
  cy.selectAndClickElement('.container-add', 0).wait(4000)
  cy.get('.list-column--xl').should('not.be.visible')
  cy.selectAndClickElement('.container-add', 0).wait(4000)
  cy.get('.list-column--xl').should('be.visible')
})

Cypress.Commands.add('searchBar', (searchText) => {
  cy.clickElement('.container-search').type(searchText || 'something something').wait(6000)
})

Cypress.Commands.add('clearSearchBar', () => {
  cy.get('.container-search').clear();

})

Cypress.Commands.add('engagementsInteraction', (noteText, searchText) => {
  cy.searchBar(searchText || 'Big Bear Labs')
  cy.wait(6000)
  // Note: "Big Bear Labs Canada Inc. - 2024-08-05" is the demo engagement which was created for testing purposes
  cy.get('.list-column--xxl').contains(searchText || 'Big Bear Labs Canada Inc. - 2024-08-05').click({ force: true })

  // Notes Tab
  cy.get('button').contains('Notes').click({ force: true })
  cy.clickElement('.container-add')
  cy.get('.text-area-field__container__input--large').click({ force: true }).type(noteText, { force: true })
  cy.get('.btn').contains('Create Note').click({ force: true })

  // Tasks Tab
  cy.get('button').contains('Tasks').click({ force: true })
  cy.get('.tabs__item').contains('Deadline').click({ force: true }).wait(6000)
  cy.get('.tabs__item').contains('Status').click({ force: true }).wait(2000)
  cy.clickElement('.toggles__item').click({ force: true, multiple: true })
  cy.selectAndClickElement('.list-item--stripe', 0) // selects the first task in the list
  cy.clickElement('.task-modal__description').type('Demo task description', { force: true })
  cy.get('.btn').contains('Update').click({ force: true })
  cy.selectAndClickElement('.list-item--stripe', 1) // selects the fourth task in the task list
  cy.get('.btn-icon').click({ force: true }) // deletes the task

  // Filters
  cy.selectAndClickElement('.container-add', 0).wait(4000) // Opens the filter panel
  cy.selectAndClickElement('.engagement-filter-modal__menu__item', 1) // Selects the item from the filter menu
  cy.clickElement('.search-field__input').wait(2000).type('hamza', { force: true }).wait(2000).type('{enter}', { force: true })
  cy.get('.btn').contains('Apply').click({ force: true })
  cy.selectAndClickElement('.container-add', 0).wait(4000)
  cy.selectAndClickElement('.engagement-filter-modal__menu__item', 2)
  cy.get('.btn').contains('Select All').click({ force: true })
  cy.get('.btn').contains('Apply').click({ force: true })

  // Create new task
  cy.selectAndClickElement('.container-add', 1).wait(4000) // Opens the filter panel
  cy.selectAndClickElement('.search-field__input', 0).wait(4000).type('big bear', { force: true }).wait(6000).type('{enter}', { force: true }) // selects the "client" input field
  cy.clickElement('.text-field-input').type('Demo task 5', { force: true }) // Selects the Task name input field
  cy.clickElement('.task-modal__description').type('Description for the Demo task 5', { force: true }) // Selects the description for the task 
  cy.selectAndClickElement('.search-field__input', 1).wait(6000).type('{enter}', { force: true }).wait(4000) // selects the status input field
  cy.get('.btn').contains('Create').click({ force: true })
})

