const ContactController = require('../controllers/ContactController');
const express = require('express');
const { verifyToken } = require('../middleware/tokenVerify');
const { storage } = require('../middleware/imageUpload');
const router = express.Router();
const multer  = require('multer')

const upload = multer({ storage: storage })

router.get('/getAllContact', ContactController.getAllContact)
router.post('/addContact', ContactController.addContact)
router.put('/updateContact/:id', ContactController.updateContact)
router.delete('/deleteContact/:id', ContactController.deleteContact)

module.exports = router