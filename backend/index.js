require('dotenv').config()

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const router = require('./routes/index')
const errorController = require('./controllers/errorContoller')

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use(router)

app.all('*', (req, res) => {
  res.status(404).json({
    status: false,
    message: 'Halaman tidak ditemukan',
  })
})

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.use(errorController)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server berjalan di port: ${PORT}`))
