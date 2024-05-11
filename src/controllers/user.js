const bcrypt = require('bcryptjs')
require('dotenv').config()

const db = require('../database/db')

const getUser = async (req, res) => {
	try {
		const customer_id = req.user.customer_id

		db.query(
			'SELECT first_name, last_name, email FROM Customers WHERE customer_id = ?',
			[customer_id],
			(error, results, fields) => {
				if (error) {
					console.error(error)
					return res
						.status(500)
						.json({ message: 'Ошибка при получении данных пользователя' })
				}
				if (results.length === 0) {
					return res.status(404).json({ message: 'Пользователь не найден' })
				}
				const userData = results[0]
				return res.status(200).json({ ...userData })
			}
		)
	} catch (error) {
		console.error(error)
		return res.status(400).json({ message: 'Что-то пошло не так' })
	}
}

const changePassword = async (req, res) => {
	try {
		const customer_id = req.user.customer_id
		const { currentPassword, newPassword } = req.body

		db.query(
			'SELECT * FROM Customers WHERE customer_id = ?',
			[customer_id],
			async (err, result) => {
				if (err) {
					console.error(err)
					return res
						.status(500)
						.json({ message: 'Ошибка при изменении пароля' })
				}
				if (result.length === 0) {
					return res.status(404).json({ message: 'Пользователь не найден' })
				}

				const match = await bcrypt.compare(currentPassword, result[0].password)
				if (!match) {
					return res.status(401).json({ message: 'Неверный текущий пароль' })
				}

				const hashedNewPassword = await bcrypt.hash(newPassword, 10)

				db.query(
					'UPDATE Customers SET password = ? WHERE customer_id = ?',
					[hashedNewPassword, customer_id],
					(err, result) => {
						if (err) {
							console.error(err)
							return res
								.status(500)
								.json({ message: 'Ошибка при изменении пароля' })
						}
						return res.status(200).json({ message: 'Пароль успешно изменен' })
					}
				)
			}
		)
	} catch {
		return res.status(400).json({ message: 'Что-то пошло не так' })
	}
}

module.exports = {
	getUser,
	changePassword,
}
