const express = require('express');

const productController = require('../controllers/productController');
const authController = require('../controllers/authController');
const imageController = require('../controllers/imageController');
const router = express.Router();

router.route('/categories').get(productController.getProductCategories);
router.route('/subcategories').get(productController.getProductSubcategories);

router.route('/:storeId/searchproducts').get(productController.findProducts);

router
  .route('/admin')
  .get(
    authController.protect,
    authController.restrictTo('store-admin'),
    productController.getProductsAdmin
  );
router
  .route('/upload-image/:id')
  .patch(
    authController.protect,
    authController.restrictTo('store-admin'),
    imageController.addImage,
    imageController.resizeImage1000x1000,
    productController.uploadProductImage
  );

router
  .route('/:id/reviews')
  .patch(authController.protect, productController.newRating);

router
  .route('/')
  .get(productController.getProductsFromStore)
  .post(
    authController.protect,
    authController.restrictTo('store-admin'),
    imageController.addImage,
    imageController.resizeImage1000x1000,
    productController.addProductToStore
  );

router
  .route('/:id')
  .delete(
    authController.protect,
    authController.restrictTo('store-admin'),
    productController.deleteProduct
  )
  .get(productController.getProductById)
  .put(
    authController.protect,
    authController.restrictTo('store-admin'),
    imageController.addImage,
    imageController.resizeImage1000x1000,
    productController.updateProduct
  );

module.exports = router;
