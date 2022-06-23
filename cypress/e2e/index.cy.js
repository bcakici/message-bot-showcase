describe("E2E Tests", () => {
	it("should see headline last 10 Customers", () => {
		// Start from the index page
		cy.visit("http://localhost:3000/");

		cy.contains("Last 10 Customers");
	});
	it("should send a message on enter", () => {
		// When "I work like a charm" is entered as a text and it is sent
		// Then I should see the message "I work like a charm" in messages
		cy.visit("http://localhost:3000/");
		cy.get('input[name="messageInput"]').type("I work like a charm{enter}");
		cy.get("#messages").contains("I work like a charm");
	});

	it("should write the rating in dashboard after saying thank you and being asked to reviews", () => {
		cy.visit("http://localhost:3000/");
		cy.get('input[name="messageInput"]').type("Thank you{enter}");
		cy.get("#messages").contains("Thank you");
		cy.get("#messages").contains("out of 5");
		cy.get('input[name="messageInput"]').type("1{enter}");
		cy.get("#messages").contains("1");
		cy.get("#dashboard").contains("1/5");
	});
});
