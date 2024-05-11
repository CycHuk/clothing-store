const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const handlebars = require('express-handlebars')
require('dotenv').config()

const app = express()

app.engine(
	'handlebars',
	handlebars.engine({
		defaultLayout: 'main',
		partialsDir: path.join(__dirname, 'views', 'components'),
	})
)
app.set('views', './views')
app.set('view engine', 'handlebars')

app.set('views', path.join(__dirname, 'views'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/page'))
app.use('/auth', require('./routes/auth'))
app.use('/product', require('./routes/product'))
app.use('/order', require('./routes/order'))
app.use('/user', require('./routes/user'))

const PORT = process.env.PORT || 6758

app.listen(PORT, () => {
	console.log(`Сервер запущен на http://localhost:${PORT}`)
})
