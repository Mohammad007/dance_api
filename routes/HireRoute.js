const HireController = require('../controllers/HireController');
const express = require('express');
const { verifyToken } = require('../middleware/tokenVerify');
const { storage } = require('../middleware/imageUpload');
const router = express.Router();
const multer  = require('multer')

const upload = multer({ storage: storage })

router.get('/getHireList', HireController.getHireList)
router.get('/getHireById/:id', HireController.getHireById)
router.post('/addHire',upload.fields([{
    name: 'profileImage',
    maxSize: '10mb',
    maxCount: 1
  },{
    name: 'footerImage',
    maxSize: '10mb',
    maxCount: 1
  },,{
    name: 'imagelist',
    maxSize: '20mb',
    maxCount: 5
  }]),HireController.addHire)
router.delete('/deleteHire', HireController.deleteHire)
router.post('/activeAndInactiveHire', HireController.activeAndInactiveHire)
router.post('/updateHire/:id', HireController.updateHire)
router.post('/profileImageUpdate', upload.single('profileImage'), HireController.profileImageUpdate)
router.post('/footerImageUpdate', upload.single('footerImage'), HireController.footerImageUpdate)
router.post('/imageListUpdate', upload.array('imagelist', 5), HireController.imageListUpdate)

module.exports = router