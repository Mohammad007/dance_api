const ReferIncomeController = require('../controllers/ReferIncomeController');
const express = require('express');
const { verifyToken } = require('../middleware/tokenVerify');
const { storage } = require('../middleware/imageUpload');
const router = express.Router();
const multer  = require('multer')

const upload = multer({ storage: storage })

router.get('/getAllReferIncome', verifyToken, ReferIncomeController.getAllReferIncome)
router.post('/addReferIncome', verifyToken, ReferIncomeController.addReferIncome)

module.exports = router