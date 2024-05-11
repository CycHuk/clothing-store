const express = require('express')
const router = express.Router()

const authMiddleware = require('../middlewares/auth')

const { getUser, changePassword } = require('../controllers/user')

router.get('/', authMiddleware, getUser)
router.post('/changePassword', authMiddleware, changePassword)

module.exports = router
