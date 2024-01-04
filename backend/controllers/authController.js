const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const { User, Auth } = require('../models')

const ApiError = require('../utils/ApiError')

const register = async (req, res, next) => {
  try {
    const { name, password, confirmPassword } = req.body
    let { email } = req.body

    if (!name || !email || !password || !confirmPassword) {
      return next(
        new ApiError(
          'Kolom nama, email, password, dan konfirmasi password harus diisi',
          400,
        ),
      )
    }

    email = email.toLowerCase()

    if (!validator.isEmail(email)) {
      return next(new ApiError('Email tidak valid', 400))
    }

    if (password.length < 8) {
      return next(new ApiError('Password harus lebih dari 8 karakter', 400))
    }

    if (password !== confirmPassword) {
      return next(
        new ApiError('Password dan konfirmasi password tidak cocok', 400),
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const isEmailExist = await Auth.findOne({ where: { email } })

    if (isEmailExist) {
      return next(new ApiError('Email sudah terdaftar', 400))
    }

    const user = await User.create({
      name,
      role: 'user',
    })

    await Auth.create({
      email,
      password: hashedPassword,
      userId: user.id,
    })

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d',
      },
    )

    return res.status(201).json({
      status: true,
      message: 'Berhasil registrasi',
      data: {
        token,
      },
    })
  } catch (error) {
    return next(new ApiError(error.message, 400))
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return next(new ApiError('Email dan password harus diisi', 400))
    }

    const auth = await Auth.findOne({ where: { email }, include: ['User'] })

    if (!auth) {
      return next(new ApiError('Email tidak terdaftar', 400))
    }

    const isMatch = await bcrypt.compare(password, auth.password)

    if (!isMatch) {
      return next(new ApiError('Password salah', 400))
    }

    const token = jwt.sign(
      {
        id: auth.User.id,
        name: auth.User.name,
        role: auth.User.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d',
      },
    )

    return res.status(200).json({
      status: true,
      message: 'Berhasil login',
      data: { token },
    })
  } catch (error) {
    return next(new ApiError(error.message, 400))
  }
}

module.exports = {
  register,
  login,
}
