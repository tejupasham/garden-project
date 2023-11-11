describe('perform authentication', () => {
	it('passes', () => {
		// visit the homepage
		cy.visit('/')

		// if a user is not registered, login the user
		if (cy.contains('Login')) cy.visit('/login')

		// mimic a login with an unregistered user
		cy.get('#email').type('abc@gmail.com')
		cy.get('#password').type(`12345678`)
		cy.get("button[type='submit']").click()

		// check error
		if (cy.contains('Invalid')) cy.visit('/register')

		// create a new account
		cy.get('#name').type('John Doe')
		cy.get('#email').type('john@gmail.com')
		cy.get('#password').type('12345678')
		cy.get("button[type='submit']").click()

		if (!cy.contains('fail')) cy.visit('/login')
	})
})
