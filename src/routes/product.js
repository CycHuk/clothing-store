const express = require('express')
const router = express.Router()

const { getProductByVariabilityId } = require('../controllers/product')

router.get('/:variability_id', async (req, res) => {
	try {
		const variabilityId = req.params.variability_id

		const product = await getProductByVariabilityId(variabilityId)

		res.json(product)
	} catch (error) {
		console.error('Ошибка получения продукта:', error)
		res.status(500).json({ error: 'Ошибка получения продукта' })
	}
})

module.exports = router
