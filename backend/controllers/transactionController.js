const { addMonths } = require('date-fns')

const {
  Transaction,
  Notification,
  Voucher,
  Product,
  User,
} = require('../models')
const ApiError = require('../utils/ApiError')
const randomstring = require('randomstring')

const createTransaction = async (req, res, next) => {
  const user = req.user

  const { productId, amount, voucherCode } = req.body

  if (!productId || !amount) {
    return next(new ApiError('ID produk dan jumlah pembelian harus diisi', 400))
  }

  if (amount < 1) {
    return next(new ApiError('Jumlah pembelian harus lebih dari 0', 400))
  }

  if (isNaN(amount)) {
    return next(new ApiError('Jumlah pembelian harus berupa angka', 400))
  }

  const product = await Product.findByPk(productId)

  if (!product) {
    return next(new ApiError('Produk tidak ditemukan', 404))
  }

  let discountPrice = 0

  if (voucherCode) {
    const voucher = await Voucher.findOne({
      where: {
        voucherCode,
      },
    })

    if (!voucher) {
      return next(new ApiError('Voucher tidak valid', 400))
    }

    if (voucher.isUsed) {
      return next(new ApiError('Voucher sudah digunakan', 400))
    }

    if (voucher.expiredAt < Date.now()) {
      return next(new ApiError('Voucher sudah kadaluarsa', 400))
    }

    if (voucher.userId !== user.id) {
      return next(new ApiError('Voucher ini tidak dapat digunakan', 403))
    }

    await voucher.update({
      isUsed: true,
    })

    discountPrice = voucher.discountPrice
  }

  const transaction = await Transaction.create({
    userId: user.id,
    productId,
    amount,
    productPrice: product.price,
    discountPrice,
    totalPrice: product.price * amount - discountPrice,
    voucherCode: voucherCode || null,
    status: 'unpaid',
  })

  res.status(201).json({
    status: true,
    message: 'Transaksi berhasil dibuat',
    data: {
      transaction,
    },
  })
}

const getTransactions = async (req, res, next) => {
  const user = req.user
  const { status } = req.query

  const conditions = {
    userId: user.id,
  }

  if (status) {
    if (status !== 'unpaid' && status !== 'paid') {
      return next(new ApiError('Status transaksi tidak valid', 400))
    }

    conditions.status = status
  }

  const transactions = await Transaction.findAll({
    where: conditions,
    include: [
      {
        model: Product,
      },
    ],
    order: [['createdAt', 'DESC']],
  })

  if (!transactions || transactions.length === 0) {
    return next(new ApiError('Data transaksi kosong', 404))
  }

  return res.status(200).json({
    status: true,
    message: 'Berhasil mendapatkan data transaksi',
    data: {
      transactions,
    },
  })
}

const getTransactionsById = async (req, res, next) => {
  console.log('\n\n\n\n\ntest masuk')
  const user = req.user
  const { id } = req.params
  const transaction = await Transaction.findOne({
    where: {
      id,
      userId: user.id,
    },
    include: [
      {
        model: Product,
      },
    ],
  })

  if (!transaction) {
    return next(new ApiError('Data transaksi tidak ditemukan', 404))
  }

  if (transaction.userId !== user.id) {
    return next(new ApiError('Tidak bisa mengakses data transaksi ini', 403))
  }

  return res.status(200).json({
    status: true,
    message: 'Berhasil mendapatkan data transaksi',
    data: {
      transaction,
    },
  })
}

const payTransaction = async (req, res, next) => {
  const user = req.user
  const { id } = req.params
  const transaction = await Transaction.findByPk(id)

  if (!transaction) {
    return next(new ApiError('Data transaksi tidak ditemukan', 404))
  }

  if (transaction.userId !== user.id) {
    return next(new ApiError('Tidak bisa mengakses data transaksi ini', 403))
  }

  if (transaction.status === 'paid') {
    return next(new ApiError('Transaksi ini sudah dibayar', 400))
  }

  if (transaction.totalPrice > user.balance) {
    return next(new ApiError('Saldo anda tidak mencukupi', 400))
  }

  if (transaction.productPrice * transaction.amount >= 2000000) {
    let voucherCode
    while (true) {
      voucherCode = randomstring.generate({ length: 8 })
      const checkVoucher = await Voucher.findOne({
        where: {
          voucherCode,
        },
      })

      if (!checkVoucher) break
    }

    const expiredDate = addMonths(Date.now(), 3)
    await Voucher.create({
      voucherCode,
      discountPrice: 10000,
      expiredAt: expiredDate,
      userId: user.id,
    })

    await Notification.create({
      userId: user.id,
      title: 'Voucher Baru',
      content: `Selamat kamu mendapatkan voucher potongan harga sebesar Rp. 10.000 untuk pembelian apapun \n\nkode voucher: ${voucherCode}\n\nVoucher ini akan expired pada ${expiredDate}`,
    })
  }

  await transaction.update({
    status: 'paid',
  })
  const newBalance = user.balance - transaction.totalPrice

  await User.update(
    {
      balance: newBalance,
    },
    {
      where: {
        id: user.id,
      },
    },
  )

  return res.status(200).json({
    status: true,
    message: 'Transaksi berhasil',
    data: {
      transaction,
    },
  })
}

const deleteTransaction = async (req, res, next) => {
  const user = req.user
  const { transactionId } = req.params
  const transaction = await Transaction.findByPk(transactionId)

  if (!transaction) {
    return next(new ApiError('Data transaksi tidak ditemukan', 404))
  }

  if (transaction.userId !== user.id) {
    return next(new ApiError('Tidak bisa mengakses data transaksi ini', 403))
  }

  if (transaction.status === 'paid') {
    return next(new ApiError('Transaksi ini sudah dibayar', 400))
  }

  await transaction.destroy()

  return res.status(200).json({
    status: true,
    message: 'Data transaksi berhasil di hapus',
  })
}

module.exports = {
  createTransaction,
  getTransactions,
  getTransactionsById,
  payTransaction,
  deleteTransaction,
}
