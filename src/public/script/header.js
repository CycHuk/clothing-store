function showCartModal() {
	var modal = document.getElementById('cartModal')
	var overlay = document.getElementById('overlay')
	modal.style.display = 'block'
	overlay.style.display = 'block'
}

function closeCartModal() {
	var modal = document.getElementById('cartModal')
	var overlay = document.getElementById('overlay')
	modal.style.display = 'none'
	overlay.style.display = 'none'
}

async function getProductInfo(variabilityId) {
	try {
		const response = await fetch(`/product/${variabilityId}`)
		const product = await response.json()
		return product
	} catch (error) {
		console.error('Ошибка получения информации о продукте:', error)
	}
}

async function showCartItems() {
	const cartItems = JSON.parse(localStorage.getItem('cart')) || []
	const cartContainer = document.getElementById('cartItems')
	const totalPriceElement = document.getElementById('totalPrice')
	let totalPrice = 0

	cartContainer.innerHTML = ''

	for (const item of cartItems) {
		const product = await getProductInfo(item.variabilityId)
		if (product) {
			const itemElement = document.createElement('div')
			itemElement.classList.add('cart-item')
			itemElement.innerHTML = `
                    <div class="cart-item-info">
                        <p>${product.product_name} - ${product.size} - ${
				product.price
			}₽</p>
                        <div class="quantity-controls">
                            <button class='quantity-btn' onclick='updateQuantity(${
															item.variabilityId
														}, ${item.quantity - 1})'>-</button>
                            <span>${item.quantity}</span>
                            <button class='quantity-btn' onclick='updateQuantity(${
															item.variabilityId
														}, ${item.quantity + 1})'>+</button>
                        </div>
                    </div>
                `
			cartContainer.appendChild(itemElement)
			totalPrice += product.price * item.quantity
		}
	}

	totalPriceElement.textContent = `Общая стоимость: ${totalPrice}₽`
}

function updateQuantity(variabilityId, newQuantity) {
	variabilityId = variabilityId.toString()
	let cart = JSON.parse(localStorage.getItem('cart')) || []
	const index = cart.findIndex(item => item.variabilityId === variabilityId)
	if (index !== -1) {
		if (newQuantity > 0) {
			cart[index].quantity = newQuantity
		} else {
			cart.splice(index, 1)
		}
		localStorage.setItem('cart', JSON.stringify(cart))
		showCartItems()
	}
}

function checkout() {
	alert('Оформление заказа')
}

showCartItems()
