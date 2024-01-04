const { Notification } = require('../models')

const ApiError = require('../utils/ApiError')

const getNotifications = async (req, res, next) => {
  try {
    const user = req.user
    const notifications = await Notification.findAll({
      where: {
        userId: user.id,
      },
    })

    if (!notifications || notifications.length === 0) {
      return next(new ApiError('Data notifikasi kosong', 404))
    }

    return res.status(200).json({
      status: true,
      message: 'Berhasil mendapatkan notifikasi',
      data: {
        notifications,
      },
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

module.exports = {
  getNotifications,
}
