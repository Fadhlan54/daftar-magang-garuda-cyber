const router = require('express').Router()
const swaggerUi = require('swagger-ui-express')

const swaggerDocument = require('../docs/swagger.json')

const Auth = require('./authRouter')
const Transaction = require('./transactionRouter')
const Product = require('./productRouter')
const User = require('./userRouter')
const Notification = require('./notificationRouter')

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
router.use('/api/v1/auth', Auth)
router.use('/api/v1/transaction', Transaction)
router.use('/api/v1/product', Product)
router.use('/api/v1/user', User)
router.use('/api/v1/notification', Notification)

module.exports = router
