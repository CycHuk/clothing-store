function addToCart(productId) {
	var sizeSelect = document.getElementById('size-select-' + productId)
	var variabilityId = sizeSelect.value

	var cartItems = JSON.parse(localStorage.getItem('cart')) || []

	var existingItem = cartItems.find(
		item => item.variabilityId === variabilityId
	)

	if (existingItem) {
		existingItem.quantity += 1
	} else {
		cartItems.push({ variabilityId: variabilityId, quantity: 1 })
	}

	localStorage.setItem('cart', JSON.stringify(cartItems))

	showCartItems()
}
