const connection = require('../database/db.js')

async function getObjectsWithTypeAndSizes(type) {
	try {
		const sql = `
            SELECT p.product_id, p.product_name, p.price, p.category, p.photo_url, 
                   pv.variability_id, pv.size
            FROM Products p
            INNER JOIN ProductVariability pv ON p.product_id = pv.product_id
            WHERE p.category = ?
            GROUP BY p.product_id, pv.variability_id
        `
		const [rows, fields] = await connection.promise().query(sql, [type])
		const groupedRows = rows.reduce((acc, row) => {
			if (!acc[row.product_id]) {
				acc[row.product_id] = {
					product_id: row.product_id,
					product_name: row.product_name,
					price: row.price,
					category: row.category,
					photo_url: row.photo_url,
					variability: [],
				}
			}
			acc[row.product_id].variability.push({
				variability_id: row.variability_id,
				size: row.size,
			})
			return acc
		}, {})
		const objectsWithSizes = Object.values(groupedRows)
		return objectsWithSizes
	} catch (error) {
		throw new Error(`Error fetching objects: ${error.message}`)
	}
}

async function getProductByVariabilityId(variabilityId) {
	return new Promise((resolve, reject) => {
		connection.query(
			`SELECT p.product_id, p.product_name, p.price, p.category, p.photo_url, pv.size
       FROM Products p
       JOIN ProductVariability pv ON p.product_id = pv.product_id
       WHERE pv.variability_id = ?`,
			[variabilityId],
			(error, results) => {
				if (error) {
					reject(error)
				} else {
					resolve(results[0])
				}
			}
		)
	})
}

module.exports = {
	getObjectsWithTypeAndSizes,
	getProductByVariabilityId,
}
