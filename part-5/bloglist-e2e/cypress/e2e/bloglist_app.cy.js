describe("Bloglist ", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Test Tunk",
      username: "ttunk",
      password: "asdf",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:5173");
  });

  it("Login form is shown", function () {
    cy.contains("login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("ttunk");
      cy.get("#password").type("asdf");
      cy.get("#login-button").click();

      cy.contains("Test Tunk logged in");
    });

    it("fails with wrong username", function () {
      cy.get("#username").type("nope.avi");
      cy.get("#password").type("asdf");
      cy.get("#login-button").click();

      cy.get(".error").contains("invalid username");
      cy.get("html").should("not.contain", "Test Tunk logged in");
    });
    it("fails with wrong password", function () {
      cy.get("#username").type("ttunk");
      cy.get("#password").type("lmao");
      cy.get("#login-button").click();

      cy.get(".error").contains("invalid password");
      cy.get("html").should("not.contain", "Test Tunk logged in");
    });
  });
});
