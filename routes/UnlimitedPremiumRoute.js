const UnlimitedPremiumController = require('../controllers/UnlimitedPremiumController');
const express = require('express');
const router = express.Router();

router.get('/premiumData', UnlimitedPremiumController.premiumData)
router.post('/premiumAdd', UnlimitedPremiumController.premiumAdd)
router.delete('/premiumDelete', UnlimitedPremiumController.premiumDelete)
router.post('/premiumUpdate/:id', UnlimitedPremiumController.premiumUpdate)

module.exports = router