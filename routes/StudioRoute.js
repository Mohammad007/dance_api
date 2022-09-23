const StudioController = require('../controllers/StudioController');
const express = require('express');
const { verifyToken } = require('../middleware/tokenVerify');
const { storage } = require('../middleware/imageUpload');
const router = express.Router();
const multer  = require('multer')

const upload = multer({ storage: storage })

router.get('/getStudiosList', StudioController.getStudiosList)
router.post('/getAllStudios', StudioController.getAllStudios)
router.post('/activeAndInactiveStudio', StudioController.activeAndInactiveStudio)
router.post('/addStudio', upload.array('image', 5), StudioController.addStudio)
router.put('/updateStudio/:id', StudioController.updateStudio)
router.post('/updateStudioImages', upload.array('image',5), StudioController.updateStudioImages)
router.delete('/deleteStudio', StudioController.deleteStudio)

module.exports = router