describe('order product', () => {
	it('passes', () => {
		cy.visit('/')

		if (cy.contains('Login')) {
			cy.visit('/login')
			cy.get('#email').type('bhargawanan@gmail.com')
			cy.get('#password').type('12345678')
			cy.get("button[type='submit']").click()

			cy.contains('View').click()

			cy.contains('Continue').click()

			cy.get('#card-el').within(() => {
				cy.fillElementsInput('cardNumber', '4111111111111111')
				cy.fillElementsInput('cardExpiry', '0121')
				cy.fillElementsInput('cardCvc', '111')

				cy.get('button[type="submit"]').click()
			})
		}
	})
})
