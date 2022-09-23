const UserController = require('../controllers/UserController');
const express = require('express');
const { verifyToken } = require('../middleware/tokenVerify');
const { storage } = require('../middleware/imageUpload');
const router = express.Router();
const multer  = require('multer')

const upload = multer({ storage: storage })

router.post('/signup', UserController.signup)
router.post('/login', UserController.login)
router.post('/verify', UserController.verify)
router.post('/resetOtp', UserController.resetOtp)
router.post('/newPassword', UserController.newPassword)
router.put('/update', verifyToken, UserController.updateProfile)
router.delete('/delete', verifyToken, UserController.deleteProfile)
router.get('/profile', verifyToken, UserController.profile)
router.post('/uploadprofile', verifyToken, upload.single('profile'), UserController.uploadProfileImage)
router.post('/forgot', UserController.forgotPassword)
router.get('/userslist', UserController.userslist)

module.exports = router