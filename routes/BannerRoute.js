const BannerController = require('../controllers/BannerController');
const express = require('express');
const { verifyToken } = require('../middleware/tokenVerify');
const { storage } = require('../middleware/imageUpload');
const router = express.Router();
const multer  = require('multer')

const upload = multer({ storage: storage })

router.get('/getAllBanner', BannerController.getAllBanner)
router.post('/addBanner', upload.single('image'), BannerController.addBanner)
router.put('/updateBanner/:id', upload.single('image'), BannerController.updateBanner)
router.delete('/deleteBanner/:id', BannerController.deleteBanner)

module.exports = router