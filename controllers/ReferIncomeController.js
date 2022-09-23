const ReferIncomeModel = require('../models/ReferIncomeModel');

// refer income get
exports.getAllReferIncome = async (req, res) => {
    const { id } = req.user;
    const referincome = await ReferIncomeModel.find({ user: id });
    return res.status(200).json({ success: true, referincome });
}

// add refer income
exports.addReferIncome = async (req, res) => {
    const { refercode, totalTime } = req.body;
    const { id } = req.user;

    // validation
    if (!refercode) return res.status(400).json({ success: false, message: 'refercode is required'});
    if (!totalTime) return res.status(400).json({ success: false, message: 'totalTime is required'});

    const referIncome = new ReferIncomeModel({
        refercode: refercode,
        totalTime: totalTime,
        user: id,
    });
    await referIncome.save();
    return res.status(200).json({ success: true, message: 'coin added successfully'});
}