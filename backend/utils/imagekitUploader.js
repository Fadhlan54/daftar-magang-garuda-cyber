const imagekit = require('../lib/imagekit')
const ApiError = require('../utils/ApiError')

const getExtension = (file) => {
  const split = file.originalname.split('.')
  return split[split.length - 1]
}

const uploadImage = async (file, next) => {
  try {
    if (file.mimetype.startsWith('image/')) {
      return next(new ApiError('Harus mengisi file gambar di kolom image', 400))
    }
    const extension = getExtension(file)

    const uploadedImage = await imagekit.upload({
      file: file.buffer,
      fileName: `Image-${Date.now()}.${extension}`,
    })

    if (!uploadedImage) {
      return next(new ApiError('Gagal upload image', 400))
    }

    return {
      imageUrl: uploadedImage.url,
    }
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

module.exports = {
  uploadImage,
}
