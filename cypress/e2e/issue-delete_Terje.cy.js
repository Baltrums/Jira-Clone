const issueTitle = "This is an issue of type: Task.";

describe("Issue deletion", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project`)
      .then((url) => {
        cy.visit(url + "/board");
        cy.contains(issueTitle).click();
      });
  });
  //Open created issue detail view
  //Click on Delete issue button
  //Check that confirmation pop-up dialogue is visible
  //Confirm the deletion
  it("Test case 1: Issue Deletion", () => {
    const expectedAmountOfIssuesAfterDeletion = 3;

    cy.get('[data-testid="modal:issue-details"]').should("be.visible");
    cy.get('[data-testid="icon:trash"]').click();
    cy.get('[data-testid="modal:confirm"]').should("be.visible");
    cy.get('[data-testid="modal:confirm"]').within(() => {
      cy.contains("Are you sure you want to delete this issue?").should(
        "be.visible"
      );
      cy.contains("Once you delete, it's gone for good").should("be.visible");
      cy.contains("Delete issue").click();
    });

    cy.get('[data-testid="modal:confirm"]').should("not.exist");

    cy.get('[data-testid="board-list:backlog"]').within(() => {
      cy.contains(issueTitle).should("not.exist");
      cy.get('[data-testid="list-issue"]').should(
        "have.length",
        expectedAmountOfIssuesAfterDeletion
      );
    });
  });
  //Open recently created issue detail view
  //Click on Delete issue button
  //Check that confirmation pop-up dialogue is visible
  //Click Cancel button
  it("Test case 2: Cancel Issue Deletion", () => {
    const expectedAmountOfIssuesAfterCancel = 4;

    cy.get('[data-testid="modal:issue-details"]').should("be.visible");
    cy.get('[data-testid="icon:trash"]').click();
    cy.get('[data-testid="modal:confirm"]').should("be.visible");
    cy.get('[data-testid="modal:confirm"]').within(() => {
      cy.contains("Are you sure you want to delete this issue?").should(
        "be.visible"
      );
      cy.contains("Once you delete, it's gone for good").should("be.visible");
      cy.contains("Cancel").click();
    });

    cy.get('[data-testid="modal:confirm"]').should("not.exist");
    cy.get('[data-testid="icon:close"]').first().click();
    cy.get('[data-testid="modal:issue-details"]').should("not.exist");

    cy.get('[data-testid="board-list:backlog"]').within(() => {
      cy.contains(issueTitle).should("be.visible");
      cy.get('[data-testid="list-issue"]').should(
        "have.length",
        expectedAmountOfIssuesAfterCancel
      );
    });
  });
});
