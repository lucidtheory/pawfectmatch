describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("/login"); // Adjust this URL if needed
  });

  it("should display the login form", () => {
    cy.get("input[name='name']").should("be.visible");
    cy.get("input[name='email']").should("be.visible");
    cy.get("button[type='submit']").should("contain", "Login");
  });

  it("should show validation errors for empty fields", () => {
    cy.get("button[type='submit']").click();
    cy.contains("Name is required").should("be.visible");
    cy.contains("Email is required").should("be.visible");
  });

  it("should allow user to type in name and email", () => {
    cy.get("input[name='name']").type("John Doe");
    cy.get("input[name='email']").type("john@example.com");

    cy.get("input[name='name']").should("have.value", "John Doe");
    cy.get("input[name='email']").should("have.value", "john@example.com");
  });

  it("should submit the form and redirect on success", () => {
    // Mock API response
    cy.intercept(
      "POST",
      "https://frontend-take-home-service.fetch.com/auth/login",
      {
        statusCode: 200,
        body: {},
      },
    ).as("loginRequest");

    cy.get("input[name='name']").type("John Doe");
    cy.get("input[name='email']").type("john@example.com");
    cy.get("button[type='submit']").click();

    // Wait for API call
    cy.wait("@loginRequest").its("request.body").should("deep.equal", {
      name: "John Doe",
      email: "john@example.com",
    });

    // Check for redirection
    cy.url().should("include", "/search");

    // Click the logout button
    cy.get("#logout").click();

    // Mock API response
    cy.intercept(
      "POST",
      "https://frontend-take-home-service.fetch.com/auth/logout",
      {
        statusCode: 200,
        body: {},
      },
    ).as("logoutRequest");

    // Wait for the logout API request
    cy.wait("@logoutRequest");

    // Verify that the user is redirected back to the login page
    cy.url().should("include", "/login");
  });
});
