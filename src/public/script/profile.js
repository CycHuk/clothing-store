function getUserInfo() {
	var xhr = new XMLHttpRequest()
	xhr.open('GET', '/user', true)
	xhr.onload = function () {
		if (xhr.status >= 200 && xhr.status < 300) {
			var userInfo = JSON.parse(xhr.responseText)
			var userInfoHTML =
				'<h1>Профиль пользователя</h1>' +
				'<p>Имя: ' +
				userInfo.first_name +
				'</p>' +
				'<p>Фамилия: ' +
				userInfo.last_name +
				'</p>' +
				'<p>Email: ' +
				userInfo.email +
				'</p>' +
				'<button id="logout-btn">Выход</button>'
			document.getElementById('user-info').innerHTML = userInfoHTML

			document
				.getElementById('logout-btn')
				.addEventListener('click', function () {
					logoutUser()
				})
		} else {
			console.error('Ошибка получения данных: ' + xhr.statusText)
		}
	}
	xhr.onerror = function () {
		console.error('Ошибка отправки запроса')
	}
	xhr.send()
}

function logoutUser() {
	fetch('/auth/logout')
		.then(response => {
			if (response.ok) {
				window.location.href = '/login'
			} else {
				console.error('Logout failed')
			}
		})
		.catch(error => {
			console.error('Error during logout:', error)
		})
}

window.onload = getUserInfo

document.addEventListener('DOMContentLoaded', function () {
	const passwordForm = document.getElementById('password-form')
	const errorMessageDiv = document.getElementById('errorMessage')
	const messageDiv = document.getElementById('message')
	const oldPasswordInput = document.getElementById('old-password')
	const newPasswordInput = document.getElementById('new-password')

	passwordForm.addEventListener('submit', async function (event) {
		event.preventDefault()

		const oldPassword = oldPasswordInput.value
		const newPassword = newPasswordInput.value

		messageDiv.textContent = ''
		errorMessageDiv.textContent = ''

		try {
			const response = await fetch('user/changePassword', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					currentPassword: oldPassword,
					newPassword: newPassword,
				}),
			})

			const data = await response.json()
			if (response.ok) {
				messageDiv.textContent = data.message
				oldPasswordInput.value = ''
				newPasswordInput.value = ''
			} else {
				errorMessageDiv.textContent = data.message
			}
		} catch (error) {
			console.error('Ошибка:', error)
			errorMessageDiv.textContent = 'Произошла ошибка при изменении пароля'
		}
	})
})

function fetchOrderList() {
	fetch('/order/list')
		.then(response => response.json())
		.then(data => {
			const orderTable = document.getElementById('order-list')
			console.log(data)
			orderTable.innerHTML = ''

			if (data.orders.length === 0) {
				const noOrdersMessage = document.createElement('p')
				noOrdersMessage.textContent = 'Нет доступных заказов.'
				orderTable.appendChild(noOrdersMessage)
				return
			}

			const tableHeader = document.createElement('tr')
			tableHeader.innerHTML = `
                <th>№</th>
                <th>Дата доставки</th>
                <th>Стоимость</th>
                <th>Адрес доставки</th>
                <th>Содержание</th>
            `
			orderTable.appendChild(tableHeader)

			data.orders.reverse()

			data.orders.forEach((order, index) => {
				const tableRow = document.createElement('tr')

				let totalCost = 0

				const productTable = document.createElement('table')
				const productTableHeader = document.createElement('tr')
				productTableHeader.innerHTML = `
                    <th>Название</th>
                    <th>Размер</th>
                    <th>Количество</th>
                    <th>Стоимость за шт</th>
                `
				productTable.appendChild(productTableHeader)

				let productsInfoPromises = order.items.map(item => {
					return fetch(`/product/${item.variability_id}`)
						.then(response => response.json())
						.then(productInfo => {
							const productRow = document.createElement('tr')
							productRow.innerHTML = `
                                <td>${productInfo.product_name}</td>
                                <td>${productInfo.size}</td>
                                <td>${item.quantity}</td>
                                <td>${parseFloat(productInfo.price).toFixed(
																	2
																)}</td>
                            `
							productTable.appendChild(productRow)

							totalCost += parseFloat(productInfo.price) * item.quantity
						})
				})

				Promise.all(productsInfoPromises).then(() => {
					tableRow.innerHTML = `
                        <td>${index + 1}</td>
                        <td>${new Date(
													order.order_date
												).toLocaleDateString()}</td>
                        <td>${totalCost.toFixed(2)}</td>
                        <td>${order.address}</td>
                        <td></td>
                    `

					const contentCell = tableRow.querySelector('td:nth-child(5)')
					contentCell.appendChild(productTable)

					orderTable.appendChild(tableRow)
				})
			})
		})
		.catch(error => {
			console.error('Ошибка при получении списка заказов:', error)
		})
}

fetchOrderList()
