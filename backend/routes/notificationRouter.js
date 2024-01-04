const router = require('express').Router()
const Notification = require('../controllers/notificationController')
const authenticate = require('../middlewares/authenticate')

router.get('/', authenticate, Notification.getNotifications)

module.exports = router
