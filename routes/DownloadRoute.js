const DownloadController = require('../controllers/DownloadController');
const express = require('express');
const { verifyToken } = require('../middleware/tokenVerify');
const { storage } = require('../middleware/imageUpload');
const router = express.Router();
const multer  = require('multer')

const upload = multer({ storage: storage })

router.get('/getAllDownload', verifyToken, DownloadController.getAllDownload)
router.get('/getDownloadById/:id', DownloadController.getDownloadById)
router.post('/addDownload', verifyToken, DownloadController.addDownload)
router.delete('/deleteDownload/:id', verifyToken, DownloadController.deleteDownload)

module.exports = router