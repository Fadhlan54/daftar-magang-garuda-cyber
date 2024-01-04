const router = require('express').Router()

const Transaction = require('../controllers/transactionController')
const authenticate = require('../middlewares/authenticate')

router.post('/', authenticate, Transaction.createTransaction)
router.get('/', authenticate, Transaction.getTransactions)
router.get('/:id', authenticate, Transaction.getTransactionsById)
router.patch('/:id/pay', authenticate, Transaction.payTransaction)
router.delete('/:id', authenticate, Transaction.deleteTransaction)

module.exports = router
