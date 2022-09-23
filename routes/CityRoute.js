const CityController = require('../controllers/CityController');
const express = require('express');
const { verifyToken } = require('../middleware/tokenVerify');
const { storage } = require('../middleware/imageUpload');
const router = express.Router();
const multer  = require('multer')

const upload = multer({ storage: storage })

router.get('/allcity', CityController.getAllCity)
router.post('/getCityByName', CityController.getCityByName)
router.post('/addcity', upload.single('image'), CityController.addCity)
router.put('/updatecity/:id', upload.single('image'), CityController.updateCity)
router.delete('/delete/:id', CityController.deleteCity)

module.exports = router