const router = require('express').Router()

const Product = require('../controllers/productController')
const authenticate = require('../middlewares/authenticate')
const checkRole = require('../middlewares/checkRole')

router.post('/', authenticate, checkRole('admin'), Product.createProduct)
router.get('/', Product.getProducts)
router.get('/:id', Product.getProductById)
router.patch(
  '/:id',
  authenticate,
  checkRole('admin'),
  Product.updateProduct,
)
router.delete(
  '/:id',
  authenticate,
  checkRole('admin'),
  Product.deleteProduct,
)

module.exports = router
