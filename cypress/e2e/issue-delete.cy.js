import { fa, faker, fakerEN } from "@faker-js/faker";

const issueModal = '[data-testid="modal:issue-details"]';
const issueList = '[data-testid="list-issue"]';
const trashIcon = '[data-testid="icon:trash"]';
const confirmModal = '[data-testid="modal:confirm"]';

describe("Issue delete", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project`)
      .then((url) => {
        cy.visit(url + "/board");
        cy.contains("This is an issue of type: Task.");
      });
  });

  //Test Case 1:Issue Deletion

  it("Should open first issue on board and delete it", () => {
    cy.get(issueList).first().click();
    cy.get(issueModal)
      .should("be.visible")
      .within(() => {});
    cy.get(trashIcon).click();

    cy.get(confirmModal)
      .should("be.visible")
      .within(() => {});
    cy.contains("Delete issue").click();

    cy.get(confirmModal).should("not.exist");
    cy.contains("This is an issue of type: Task.").should("not.exist");
  });

  //Test Case 2:Issue Deletion Cancellation

  it("Should open first issue on board, start deletion and cancel it", () => {
    cy.get(issueList).first().click();
    cy.get(issueModal)
      .should("be.visible")
      .within(() => {});
    cy.get(trashIcon).click();

    cy.get(confirmModal)
      .should("be.visible")
      .within(() => {});
    cy.contains("Cancel").click();

    cy.get(confirmModal).should("not.exist");
  });
});
