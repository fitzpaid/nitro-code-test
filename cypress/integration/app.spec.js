/// <reference types="cypress" />

// cypress is stopping even though error is caught by error boundary
Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

context("Test App - Failed to Load", () => {
  it("groups data by weeks by default", () => {
    cy.intercept("GET", "/get-json", { forceNetworkError: true }).as("err");
    cy.visit("http://localhost:3000/");
    cy.findByText(/something went wrong, try again later/i);
  });
});

context("Test App - Loads successfully", () => {
  beforeEach(() => {
    cy.intercept("/get-json", { fixture: "posts.json" });
  });

  it("groups data by weeks by default", () => {
    cy.visit("http://localhost:3000/");
    cy.findByText(/11/);
    cy.findByText(/12/);
    cy.findByLabelText(/group by/i).click();
    cy.focused().findByText(/week posted/i);
  });

  it("allows us to sort by Location", () => {
    cy.visit("http://localhost:3000/");
    cy.findByLabelText(/group by/i).click();
    cy.findByRole(/listbox/i)
      .findByText(/location/i)
      .click();
    // not ideal but the  library picks up the hidden text too
    cy.get(":nth-child(1) > .MuiAccordionSummary-root").findByText(
      /san francisco/i
    );
    cy.get(":nth-child(2) > .MuiAccordionSummary-root").findByText(/sydney/i);
    cy.get(":nth-child(3) > .MuiAccordionSummary-root").findByText(/dublin/i);
  });

  it("allows us to sort by Author", () => {
    cy.visit("http://localhost:3000/");
    cy.findByLabelText(/group by/i).click();
    cy.findByRole(/listbox/i)
      .findByText(/author/i)
      .click();
    // not ideal but the  library picks up the hidden text too
    cy.get(":nth-child(1) > .MuiAccordionSummary-root").findByText(
      /happy user/i
    );
    cy.get(":nth-child(2) > .MuiAccordionSummary-root").findByText(
      /happy developer/i
    );
    cy.get(":nth-child(3) > .MuiAccordionSummary-root").findByText(
      /happy manager/i
    );
  });

  it("allows user to change the author name and location of a post and updates correctly", () => {
    cy.visit("http://localhost:3000/");
    cy.findByLabelText(/group by/i).click();
    cy.findByRole(/listbox/i)
      .findByText(/author/i)
      .click();
    // not ideal but the  library picks up the hidden text too
    cy.get(":nth-child(1) > .MuiAccordionSummary-root")
      .click()
      .parent()
      .findAllByDisplayValue(/happy user/i)
      .first()
      .clear()
      .type("New User");

    cy.get(":nth-child(1) > .MuiAccordionSummary-root")
      .parent()
      .findAllByDisplayValue(/san francisco/i)
      .first()
      .clear()
      .type("New Location");

    cy.get(":nth-child(1) > .MuiAccordionSummary-root")
      .parent()
      .findAllByText(/update post/i)
      .first()
      .click();

    cy.get(":nth-child(1) > .MuiAccordionSummary-root").findByText(/new user/i);
    cy.get(":nth-child(2) > .MuiAccordionSummary-root").findByText(
      /happy user/i
    );
    cy.get(":nth-child(3) > .MuiAccordionSummary-root").findByText(
      /happy developer/i
    );
    cy.get(":nth-child(4) > .MuiAccordionSummary-root").findByText(
      /happy manager/i
    );

    cy.findByLabelText(/group by/i).click();
    cy.findByRole(/listbox/i)
      .findByText(/location/i)
      .click();
    // not ideal but the  library picks up the hidden text too
    cy.get(":nth-child(1) > .MuiAccordionSummary-root").findByText(
      /new location/i
    );
    cy.get(":nth-child(2) > .MuiAccordionSummary-root").findByText(
      /san francisco/i
    );
    cy.get(":nth-child(3) > .MuiAccordionSummary-root").findByText(/sydney/i);
    cy.get(":nth-child(4) > .MuiAccordionSummary-root").findByText(/dublin/i);
  });
});
