// Functions
function assertConfirmation(title, message) {
  cy.get('[data-testid="modal:confirm"]')
    .should("be.visible")
    .and("contain", title)
    .and("contain", message);
}

function clickButtonInConfirm(button, buttonText) {
  cy.get(button).should("contain", buttonText).click();
}

function IssueVisibility(issueTitle, trueOrFalse) {
  cy.get('[data-testid="list-issue"]').should("be.visible");
  cy.reload();

  if (trueOrFalse) {
    cy.contains(issueTitle).should("be.visible");
  } else {
    cy.contains(issueTitle).should("not.exist");
  }
}
// Variables
const issueTitle = "This is an issue of type: Task.";
const title = "Are you sure you want to delete this issue?";
const message = "Once you delete, it's gone for good.";

describe("Issue deletion", () => {
  beforeEach(() => {
    cy.visit("/project/board").then(() => {
      cy.url().should("eq", `${Cypress.env("baseUrl")}project/board`);
      cy.contains(issueTitle).click();
      cy.get('[data-testid="modal:issue-details"]').should("be.visible");
      cy.get('[placeholder="Short summary"]').should("have.text", issueTitle);
    });
  });

  // Assignment 3: Issue Deletion
  it("Should successfully delete and validate the issue", () => {
    cy.get('[data-testid="icon:trash"]').click();
    assertConfirmation(title, message);
    clickButtonInConfirm(".sc-bwzfXH.dIxFno.sc-kGXeez.bLOzZQ", "Delete issue");
    cy.get('[data-testid="modal:confirm"]').should("not.exist");
    IssueVisibility(issueTitle, false);
  });

  // Assignment 3: Issue Deletion Cancellation
  it("Should cancel deletion of the issue", () => {
    cy.get('[data-testid="icon:trash"]').click();
    assertConfirmation(title, message);
    clickButtonInConfirm(".sc-bwzfXH.ewzfNn.sc-kGXeez.bLOzZQ", "Cancel");
    cy.get('[data-testid="modal:confirm"]').should("not.exist");
    cy.get(".sc-bdVaJa.fuyACr").click();
    IssueVisibility(issueTitle, true);
  });
});
