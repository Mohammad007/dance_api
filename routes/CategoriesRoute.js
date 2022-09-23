const CategoriesController = require('../controllers/CategoriesController');
const express = require('express');
const { verifyToken } = require('../middleware/tokenVerify');
const { storage } = require('../middleware/imageUpload');
const router = express.Router();
const multer  = require('multer')

const upload = multer({ storage: storage })

router.get('/getAllCategories', CategoriesController.getAllCategories)
router.post('/getCategoriesByName', CategoriesController.getCategoriesByName)
router.post('/addCategories', upload.single('image'), CategoriesController.addCategories)
router.put('/updateCategories/:id', upload.single('image'), CategoriesController.updateCategories)
router.delete('/deleteCategories/:id', CategoriesController.deleteCategories)

module.exports = router