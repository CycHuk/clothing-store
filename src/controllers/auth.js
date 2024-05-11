const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config()

const db = require('../database/db')

const register = async (req, res) => {
	try {
		const { firstName, lastName, email, password } = req.body
		const hashedPassword = await bcrypt.hash(password, 10)

		db.query(
			'SELECT * FROM Customers WHERE email = ?',
			[email],
			async (err, result) => {
				if (err) {
					console.error(err)
					return res.status(500).json({ message: 'Ошибка регистрации' })
				}

				if (result.length > 0) {
					return res.status(400).json({ message: 'Email уже используется' })
				} else {
					db.query(
						'INSERT INTO Customers (first_name, last_name, email, password) VALUES (?, ?, ?, ?)',
						[firstName, lastName, email, hashedPassword],
						(err, result) => {
							if (err) {
								console.error(err)
								return res.status(500).json({ message: 'Ошибка регистрации' })
							} else {
								const customer_id = result.insertId
								const token = jwt.sign(
									{ email: email, customer_id: customer_id },
									process.env.SECRET_KEY,
									{
										expiresIn: '1h',
									}
								)
								res.cookie('token', token, {
									httpOnly: true,
								})
								return res.status(200).json({ message: 'Успешная регистрация' })
							}
						}
					)
				}
			}
		)
	} catch {
		return res.status(400).json({ message: 'Что-то пошло не так' })
	}
}

const login = async (req, res) => {
	try {
		const { email, password } = req.body

		db.query(
			'SELECT * FROM Customers WHERE email = ?',
			[email],
			async (err, result) => {
				if (err) {
					console.error(err)
					return res.status(500).json({ message: 'Ошибка аутентификации' })
				}
				if (result.length === 0) {
					return res.status(401).json({ message: 'Неверный email или пароль' })
				}

				const match = await bcrypt.compare(password, result[0].password)
				if (!match) {
					return res.status(401).json({ message: 'Неверный email или пароль' })
				}

				const token = jwt.sign(
					{ email: email, customer_id: result[0].customer_id },
					process.env.SECRET_KEY,
					{
						expiresIn: '1h',
					}
				)
				res.cookie('token', token, {
					httpOnly: true,
				})
				return res.status(200).json({ message: 'Успешная авторизация' })
			}
		)
	} catch {
		return res.status(400).json({ message: 'Что-то пошло не так' })
	}
}

const logout = (req, res) => {
	res.clearCookie('token')
	res.redirect('/login')
}

module.exports = {
	login,
	register,
	logout,
}
