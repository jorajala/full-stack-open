describe("Bloglist ", function () {
  beforeEach(function () {
    cy.visit("http://localhost:5173");
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const testUser = {
      name: "Test user",
      username: "tuser",
      password: "asdf",
    };
    cy.request("POST", "http://localhost:3003/api/users/", testUser);
    const testUser2 = {
      name: "Test user 2",
      username: "tuser2",
      password: "asdf",
    };
    cy.request("POST", "http://localhost:3003/api/users/", testUser);
  });

  it("Login form is shown", function () {
    cy.contains("login");
  });

  describe("Login", function () {
    it("Succeeds with correct credentials", function () {
      cy.get("#username").type("tuser");
      cy.get("#password").type("asdf");
      cy.get("#login-button").click();

      cy.contains("Test Tunk logged in");
    });

    it("Fails with wrong username", function () {
      cy.get("#username").type("nope.avi");
      cy.get("#password").type("asdf");
      cy.get("#login-button").click();

      cy.get(".error").contains("invalid username");
      cy.get("html").should("not.contain", "Test Tunk logged in");
    });
    it("Fails with wrong password", function () {
      cy.get("#username").type("tuser");
      cy.get("#password").type("lmao");
      cy.get("#login-button").click();

      cy.get(".error").contains("invalid password");
      cy.get("html").should("not.contain", "Test Tunk logged in");
    });
  });
  describe("When logged in", function () {
    beforeEach(function () {
      cy.get("#username").type("tuser");
      cy.get("#password").type("asdf");
      cy.get("#login-button").click();
    });

    it.only("Blogs can be created", function () {
      let title = "Test title";
      let author = "Tester";
      let url = "testurl";
      cy.contains("create blog").click();
      cy.get("#addblog-title").type(title);
      cy.get("#addblog-author").type(author);
      cy.get("#addblog-url").type(url);
      cy.get("#addblog-button").click();

      cy.get(".blog").eq(0).should("contain", "Test title Tester");
    });
  });
});
