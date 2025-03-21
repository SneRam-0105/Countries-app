import "../support/commands";
import "@testing-library/cypress/add-commands";

describe("Countries Application", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("displays the navigation bar correctly", ()=>{
        cy.findByRole("banner").should("exist");
        // cy.findByRole("link", {name: "Home"}).should("exist");
        cy.findByRole("link", {name: "Countries"}).click();

        cy.findByRole("link", {name: "Test"}).should("exist");

       

    });

   

  
})