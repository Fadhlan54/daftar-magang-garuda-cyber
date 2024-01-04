const router = require('express').Router()
const User = require('../controllers/userController')
const authenticate = require('../middlewares/authenticate')

router.get('/', authenticate, User.getDetailUser)
router.post('/topup', authenticate, User.topUp)
router.get('/voucher', authenticate, User.getVoucher)

module.exports = router
