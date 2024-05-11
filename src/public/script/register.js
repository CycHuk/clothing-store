document
	.querySelector('.register-container form')
	.addEventListener('submit', async event => {
		event.preventDefault()

		const firstName = document.getElementById('firstName').value
		const lastName = document.getElementById('lastName').value
		const email = document.getElementById('email').value
		const password = document.getElementById('password').value

		const errorMessageDiv = document.getElementById('errorMessage')

		try {
			const response = await fetch('/auth/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ firstName, lastName, email, password }),
			})

			if (response.ok) {
				window.location.href = '/'
			} else {
				const responseData = await response.json()
				errorMessageDiv.textContent = responseData.message
			}
		} catch (error) {
			console.error('Ошибка:', error)
			errorMessageDiv.textContent = 'Произошла ошибка при отправке запроса.'
		}
	})
