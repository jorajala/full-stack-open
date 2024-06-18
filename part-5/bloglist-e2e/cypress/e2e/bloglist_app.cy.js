describe("Bloglist ", function () {
  beforeEach(function () {
    cy.visit("http://localhost:5173");
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const testUser = {
      name: "Test User",
      username: "tuser",
      password: "asdf",
    };
    cy.request("POST", "http://localhost:3003/api/users/", testUser);
    const testUser2 = {
      name: "Test User 2",
      username: "tuser2",
      password: "asdf",
    };
    cy.request("POST", "http://localhost:3003/api/users/", testUser);
    cy.request("POST", "http://localhost:3003/api/users/", testUser2);
  });

  it("Login form is shown", function () {
    cy.contains("login");
  });

  describe("Login", function () {
    it("Succeeds with correct credentials", function () {
      cy.get("#username").type("tuser");
      cy.get("#password").type("asdf");
      cy.get("#login-button").click();
      cy.contains("Test User logged in");
    });

    it("Fails with wrong username", function () {
      cy.get("#username").type("invalid");
      cy.get("#password").type("asdf");
      cy.get("#login-button").click();

      cy.get(".error").contains("invalid username");
      cy.get("html").should("not.contain", "Test User logged in");
    });
    it("Fails with wrong password", function () {
      cy.get("#username").type("tuser");
      cy.get("#password").type("invalid");
      cy.get("#login-button").click();

      cy.get(".error").contains("invalid password");
      cy.get("html").should("not.contain", "Test User logged in");
    });
  });
  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "tuser", password: "asdf" });
    });

    it("Blogs can be created", function () {
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

    describe("When there is a blog", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "Test blog",
          author: "Tester",
          url: "testurl",
          likes: 0,
        });
      });
      it("It can be liked", function () {
        cy.get(".blog").eq(0).contains("details").click();
        cy.get(".blog-details").contains("like").click();
        cy.get(".blog-details").contains("likes: 1");
      });

      it("It can be deleted", function () {
        cy.get(".blog").eq(0).contains("details").click();
        cy.get(".blog-details").contains("remove").click();
        cy.get("html").should("not.contain", ".blog");
      });

      it("It can't be deleted by other users", function () {
        cy.login({ username: "tuser2", password: "asdf" });
        cy.get(".blog").eq(0).contains("details").click();
        cy.get(".blog-details").should("not.contain", "remove");
      });
    });

    describe("When there are multiple blogs", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "The best blog",
          author: "Handsome Devil",
          url: "testurl",
          likes: 666,
        });
        cy.createBlog({
          title: "The not so great blog",
          author: "Loser",
          url: "testurl",
          likes: 7,
        });
      });
      it("Blog list is sorted by likes", function () {
        cy.get(".blog").eq(0).should("contain", "The best blog");
        cy.get(".blog").eq(1).should("contain", "The not so great blog");
      });
    });
  });
});
