document
	.querySelector('.login-container form')
	.addEventListener('submit', async event => {
		event.preventDefault()

		const email = document.getElementById('email').value
		const password = document.getElementById('password').value

		try {
			const response = await fetch('/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			})

			if (response.ok) {
				window.location.href = '/'
			} else {
				const data = await response.json()
				const errorMessageDiv = document.getElementById('errorMessage')
				errorMessageDiv.textContent = data.message
			}
		} catch (error) {
			console.error('Ошибка:', error)
		}
	})
