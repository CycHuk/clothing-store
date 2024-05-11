const express = require('express')
const router = express.Router()

const {
	getObjectsWithTypeAndSizes,
	getProductByVariabilityId,
} = require('../controllers/product')

const authMiddleware = require('../middlewares/auth')

router.get('/', async (req, res) => {
	const Tshirts = await getObjectsWithTypeAndSizes('Футболки')
	const TrousersMale = await getObjectsWithTypeAndSizes('Брюки для мужчин')
	const TrousersWomen = await getObjectsWithTypeAndSizes('Брюки для женщин')

	res.render('index', {
		Tshirts,
		TrousersMale,
		TrousersWomen,
	})
})
router.get('/register', async (req, res) => {
	res.render('register')
})

router.get('/login', async (req, res) => {
	res.render('login')
})
router.get('/profile', authMiddleware, async (req, res) => {
	res.render('profile')
})
router.get('/order', authMiddleware, async (req, res) => {
	res.render('order')
})

module.exports = router
