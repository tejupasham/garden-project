const SUCCESSFUL_CARD_NUMBER = '4111111111111111'
const FAILING_CARD_NUMBER = '4000000000000002'

describe('order product', () => {
	it('passes', () => {
		cy.visit('/')

		if (cy.contains('Login')) {
			cy.visit('/login')
			cy.get('#email').type('john@gmail.com')
			cy.get('#password').type('12345678')
			cy.get("button[type='submit']").click()

			cy.contains('View').click()

			cy.contains('Continue').click()

			cy.get('#card-el').within(() => {
				cy.fillElementsInput('cardNumber', FAILING_CARD_NUMBER)
				cy.fillElementsInput('cardExpiry', '0127')
				cy.fillElementsInput('cardCvc', '111')

				cy.get('button[type="submit"]').click()
			})

			if (cy.contains('Error')) cy.visit('/orders')
		}
	})
})
