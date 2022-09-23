const PricesController = require('../controllers/PricesController');
const express = require('express');
const router = express.Router();

router.get('/getPricesList', PricesController.getPricesList)
router.post('/addPrices', PricesController.addPrices)
router.delete('/deletePrices', PricesController.deletePrices)
router.post('/updatePrices/:id', PricesController.updatePrices)

module.exports = router