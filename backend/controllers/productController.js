const { Product } = require('../models')

const ApiError = require('../utils/ApiError')
const { uploadImage } = require('../utils/imagekitUploader')

const createProduct = async (req, res, next) => {
  try {
    const { name, description, category, price } = req.body
    const { image } = req.files
    if (!name || !description || !category || !price || !image) {
      return next(
        new ApiError(
          'nama, deskripsi, kategori, harga,dan gambar harus diisi',
          400,
        ),
      )
    }

    const { imageUrl } = await uploadImage(image, next)

    const product = await Product.create({
      name,
      imageUrl,
      description,
      category,
      price,
    })

    return res.status(201).json({
      status: true,
      message: 'Data product berhasil ditambahkan',
      data: {
        product,
      },
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll()

    if (!products) {
      return next(new ApiError('Data product kosong', 404))
    }

    return res.status(200).json({
      status: true,
      message: 'Berhasil mendapatkan data product',
      data: {
        products,
      },
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
      return next(new ApiError('Data product tidak ditemukan', 404))
    }

    return res.status(200).json({
      status: true,
      message: 'Berhasil mendapatkan data product',
      data: {
        product,
      },
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params
    const { name, description, category, price } = req.body
    const { image } = req.files

    const updateData = {}

    if (name) {
      updateData.name = name
    }

    if (description) {
      updateData.description = description
    }

    if (category) {
      updateData.category = category
    }

    if (price) {
      updateData.price = price
    }

    if (image) {
      const { imageUrl } = await uploadImage(image, next)
      updateData.imageUrl = imageUrl
    }

    const product = await Product.findByPk(id)

    if (!product) {
      return next(new ApiError('Data product tidak ditemukan', 404))
    }

    await product.update(updateData)

    return res.status(200).json({
      status: true,
      message: 'Data product berhasil diupdate',
      data: {
        product,
      },
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
      return next(new ApiError('Data product tidak ditemukan', 404))
    }

    await product.destroy()

    return res.status(200).json({
      status: true,
      message: 'Data product berhasil di hapus',
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
}
