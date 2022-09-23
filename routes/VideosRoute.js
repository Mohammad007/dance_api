const VideosController = require('../controllers/VideosController');
const express = require('express');
const { verifyToken } = require('../middleware/tokenVerify');
const { storage } = require('../middleware/imageUpload');
const router = express.Router();
const multer  = require('multer')

const upload = multer({ storage: storage })

router.get('/getAllVideos', VideosController.getAllVideos)
router.post('/addVideos', upload.single('videos'), VideosController.addVideos)
router.put('/updateVideos/:id', upload.single('videos'), VideosController.updateVideos)
router.delete('/deleteVideos/:id', VideosController.deleteVideos)

module.exports = router