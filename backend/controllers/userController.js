const { User, Auth, Voucher } = require('../models')
const ApiError = require('../utils/ApiError')

const getDetailUser = async (req, res, next) => {
  const { id } = req.user

  const user = await User.findByPk(id, {
    include: [
      {
        model: Auth,
      },
    ],
  })

  return res.status(200).json({
    status: true,
    message: 'Berhasil mendapatkan data user',
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.Auth.email,
        balance: user.balance,
      },
    },
  })
}

const topUp = async (req, res, next) => {
  const { id } = req.user
  const { amount } = req.body

  if (!amount) {
    return next(new ApiError('Jumlah top up harus diisi', 400))
  }

  if (isNaN(amount)) {
    return next(new ApiError('Jumlah top up harus berupa angka', 400))
  }

  const user = await User.findByPk(id)
  await user.update({
    balance: user.balance + amount,
  })

  return res.status(200).json({
    status: true,
    message: `Berhasil top up sebesar ${amount}`,
  })
}

const getVoucher = async (req, res, next) => {
  try {
    const { status } = req.query

    const whereCondition = {
      userId: req.user.id,
    }
    if (status === 'used') {
      whereCondition.isUsed = true
    }

    if (status === 'unused') {
      whereCondition.isUsed = false
    }

    const voucher = await Voucher.findAll({
      where: whereCondition,
      order: [['createdAt', 'DESC']],
    })

    res.status(200).json({
      status: true,
      message: 'Berhasil mendapatkan data voucher',
      data: {
        voucher,
      },
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

module.exports = {
  getDetailUser,
  topUp,
  getVoucher,
}
