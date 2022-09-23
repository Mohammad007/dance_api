const PricesModel = require('../models/PricesModel');

// get prices list
exports.getPricesList = async (req, res) => {
    try {
        const priceslist = await PricesModel.find().limit(3).sort({'updatedAt':-1})
        if(!priceslist) return res.status(400).json({ success: false, message: 'No Hire User found!'});
        return res.status(200).json({ success: true, priceslist });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Something went wrong!' });
    }
}

// add prices
exports.addPrices = async (req, res) => {
    const { title, subtitle, price } = req.body;

    // validation
    if (!title) return res.status(400).json({ success: false, message: 'title is required'});
    if (!subtitle) return res.status(400).json({ success: false, message: 'subtitle is required'});
    if (!price) return res.status(400).json({ success: false, message: 'price is required'});

    try {
        const prices = new PricesModel({
            title,
            subtitle,
            price
        });
        await prices.save();
        return res.status(200).json({ success: true, message: 'Prices added successfully'});
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Something went wrong!' });
    }
}

// delete prices
exports.deletePrices = async (req, res) => {
    const { id } = req.body;

    // validation
    if (!id) return res.status(400).json({ success: false, message: 'id is required'});

    try {
        const prices = await PricesModel.findById(id);
        if(!prices) return res.status(400).json({ success: false, message: 'No Price found'});
        await prices.remove();
        return res.status(200).json({ success: true, message: 'Price deleted successfully'});
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Something went wrong!' });
    }
}

// update hire us
exports.updatePrices = async (req, res) => {
    const { title, subtitle, price } = req.body;
    const { id } = req.params;

    try {
        const prices = await PricesModel.findById(id);

        prices.title = title;
        prices.subtitle = subtitle;
        prices.price = price;
        await prices.save();
        return res.status(200).json({ success: true, message: 'Price updated successfully'});
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Something went wrong!' });
    }
}