describe('order cancel', () => {
	it('passes', () => {
		cy.visit('/')

		if (cy.contains('Login')) {
			cy.visit('/login')
			cy.get('#email').type('john@gmail.com')
			cy.get('#password').type('12345678')
			cy.get("button[type='submit']").click()

			cy.contains('View').click()

			cy.contains('Continue').click()

			cy.contains('Cancel').click()

			cy.visit('/orders')
		}
	})
})
