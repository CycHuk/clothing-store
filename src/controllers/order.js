const db = require('../database/db')

const getOrder = async (req, res) => {
	try {
		const customer_id = req.user.customer_id

		const sql = `
            SELECT O.order_id, O.customer_id, O.address, O.order_date,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'order_item_id', I.order_item_id,
                        'variability_id', I.variability_id,
                        'quantity', I.quantity
                    )
                ) AS items
            FROM Orders O
            JOIN OrderItems I ON O.order_id = I.order_id
            WHERE O.customer_id = ?
            GROUP BY O.order_id
        `

		db.query(sql, [customer_id], (error, results) => {
			if (error) {
				return res
					.status(400)
					.json({ message: 'Ошибка при выполнении запроса к базе данных' })
			}

			const orders = results.map(order => ({
				order_id: order.order_id,
				customer_id: order.customer_id,
				address: order.address,
				order_date: order.order_date,
				items: order.items,
			}))

			return res.status(200).json({ message: 'Ok', orders: orders })
		})
	} catch (error) {
		return res.status(400).json({ message: 'Что-то пошло не так' })
	}
}

const addOrder = async (req, res) => {
	try {
		const { address, deliveryDate, cart } = req.body
		const customer_id = req.user.customer_id

		if (
			!address ||
			!deliveryDate ||
			!cart ||
			!Array.isArray(cart) ||
			cart.length === 0
		) {
			return res
				.status(400)
				.json({ message: 'Отсутствуют необходимые данные в запросе' })
		}

		const minDeliveryDate = new Date()
		minDeliveryDate.setDate(minDeliveryDate.getDate() + 2)
		if (new Date(deliveryDate) < minDeliveryDate) {
			return res.status(400).json({
				message:
					'Дата доставки должна быть не менее чем на 2 дня вперед от текущей даты',
			})
		}

		const orderInsertQuery = `INSERT INTO Orders (customer_id, address, order_date) VALUES (?, ?, ?)`
		const orderValues = [customer_id, address, deliveryDate]

		const [orderResult] = await db
			.promise()
			.execute(orderInsertQuery, orderValues)

		const orderId = orderResult.insertId

		for (const item of cart) {
			const { variabilityId, quantity } = item

			const orderItemInsertQuery = `INSERT INTO OrderItems (order_id, variability_id, quantity) VALUES (?, ?, ?)`
			const orderItemValues = [orderId, variabilityId, quantity]

			await db.promise().execute(orderItemInsertQuery, orderItemValues)
		}

		return res.status(200).json({ message: 'Заказ успешно добавлен' })
	} catch (error) {
		console.error('Ошибка при добавлении заказа:', error)
		return res.status(500).json({ message: 'Ошибка сервера' })
	}
}

module.exports = {
	getOrder,
	addOrder,
}
