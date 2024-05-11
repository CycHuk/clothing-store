const express = require('express')
const router = express.Router()

const authMiddleware = require('../middlewares/auth')

const { getOrder, addOrder } = require('../controllers/order')

router.get('/list', authMiddleware, getOrder)
router.post('/add', authMiddleware, addOrder)

module.exports = router
