describe("Issue comments creating, editing and deleting", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        cy.visit(url + "/board");
        cy.contains("This is an issue of type: Task.").click();
      });
  });

  const getIssueDetailsModal = () =>
    cy.get('[data-testid="modal:issue-details"]');
  const comment = "TEST_COMMENT";
  const commentEdited = "COMMENT_EDITED";
  const previousComment = "An old silent pond...";
  const getIssueComment = () => cy.get('[data-testid="issue-comment"]');
  const placeHolderAddComment = () =>
    cy.get('textarea[placeholder="Add a comment..."]');
  const issueComment = '[data-testid="issue-comment"]';
  const modalConfirm = '[data-testid="modal:confirm"]';

  it("Should create a comment successfully", () => {
    const comment = "TEST_COMMENT";

    getIssueDetailsModal().within(() => {
      cy.contains("Add a comment...").click();

      cy.get('textarea[placeholder="Add a comment..."]').type(comment);

      cy.contains("button", "Save").click().should("not.exist");

      cy.contains("Add a comment...").should("exist");
      cy.get('[data-testid="issue-comment"]').should("contain", comment);
    });
  });

  it("Should edit a comment successfully", () => {
    const previousComment = "An old silent pond...";
    const comment = "TEST_COMMENT_EDITED";

    getIssueDetailsModal().within(() => {
      cy.get('[data-testid="issue-comment"]')
        .first()
        .contains("Edit")
        .click()
        .should("not.exist");

      cy.get('textarea[placeholder="Add a comment..."]')
        .should("contain", previousComment)
        .clear()
        .type(comment);

      cy.contains("button", "Save").click().should("not.exist");

      cy.get('[data-testid="issue-comment"]')
        .should("contain", "Edit")
        .and("contain", comment);
    });
  });

  it("Should delete a comment successfully", () => {
    getIssueDetailsModal()
      .find('[data-testid="issue-comment"]')
      .contains("Delete")
      .click();

    cy.get('[data-testid="modal:confirm"]')
      .contains("button", "Delete comment")
      .click()
      .should("not.exist");

    getIssueDetailsModal()
      .find('[data-testid="issue-comment"]')
      .should("not.exist");
  });

  //Comprehesive test of creating, editing and deleting comment

  it("Should create, edit and delete comment", () => {
    getIssueDetailsModal().within(() => {
      //Add Comment
      cy.contains("Add a comment...").click();

      placeHolderAddComment().type(comment);

      cy.contains("button", "Save").click().should("not.exist");

      cy.contains("Add a comment...").should("exist");
      getIssueComment().should("contain", comment);

      //Edit Comment

      getIssueComment().last().contains("Edit").click().should("not.exist");

      placeHolderAddComment()
        .should("contain", previousComment)
        .clear()
        .type(commentEdited);

      cy.contains("button", "Save").click().should("not.exist");

      getIssueComment().should("contain", "Edit").and("contain", comment);
    });
    //Delete comment

    getIssueDetailsModal().find(issueComment).contains("Delete").click();

    cy.get(modalConfirm)
      .contains("button", "Delete comment")
      .click()
      .should("not.exist");

    getIssueDetailsModal().contains(comment).should("not.exist");
  });
});
