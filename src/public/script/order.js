document.addEventListener('DOMContentLoaded', async function () {
	const cart = JSON.parse(localStorage.getItem('cart')) || []

	const orderTableBody = document.querySelector('#order-table tbody')
	let totalCost = 0

	for (const item of cart) {
		const product = await getProductInfo(item.variabilityId)
		const row = document.createElement('tr')
		row.innerHTML = `
            <td>${product.product_name}</td>
            <td>${product.size}</td>
            <td>${product.price}₽</td>
            <td>${item.quantity}</td>
        `
		orderTableBody.appendChild(row)

		totalCost += product.price * item.quantity
	}

	const totalCostRow = document.createElement('tr')
	totalCostRow.innerHTML = `
        <td colspan="3"><strong>Общая стоимость заказа:</strong></td>
        <td>${totalCost}₽</td>
    `
	orderTableBody.appendChild(totalCostRow)

	async function getProductInfo(variabilityId) {
		try {
			const response = await fetch(`/product/${variabilityId}`)
			const product = await response.json()
			return product
		} catch (error) {
			console.error('Ошибка получения информации о продукте:', error)
		}
	}

	document
		.getElementById('place-order-btn')
		.addEventListener('click', async function () {
			const address = document.getElementById('address').value
			const deliveryDate = document.getElementById('delivery-date').value

			const orderData = {
				address: address,
				deliveryDate: deliveryDate,
				cart: cart,
			}
			try {
				const response = await fetch('/order/add', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(orderData),
				})

				if (response.ok) {
					localStorage.removeItem('cart')
					window.location.href = '/'
				} else {
					const errorMessageDiv = document.getElementById('errorMessage')
					const errorData = await response.json()
					errorMessageDiv.textContent = `Ошибка при оформлении заказа: ${errorData.message}`
				}
			} catch (error) {
				console.error('Ошибка при отправке запроса:', error)
			}
		})
})
