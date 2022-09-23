const UnlimitedPremiumModel = require('../models/UnlimitedPremiumModel');

// premium get data
exports.premiumData = async (req, res) => {
    try {
        const premiumlist = await UnlimitedPremiumModel.find().limit(5).sort({'updatedAt':-1})
        if (!premiumlist) return res.status(404).json({ success: false, message: 'premium data not found'});
        return res.status(200).json({ success: true, premiumlist:premiumlist });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something went wrong'});
    }
}

// premium add data
exports.premiumAdd = async (req, res) => {
  const { title, content } = req.body;

  // validation
  if (!title) return res.status(400).json({ success: false, message: 'title is required'});
  if (!content) return res.status(400).json({ success: false, message: 'content is required'});

  try {
    // check add data
    const premium = new UnlimitedPremiumModel({ title, content });
    await premium.save();
    return res.status(200).json({ success: true, message: 'Data created successfully'});
  } catch (error) {
    return res.status(500).json({ success: false, message: 'something went wrong'});
  }

}

// premium update data
exports.premiumUpdate = async (req, res) => {
    const { title, content } = req.body;
    const { id } = req.params
  
    try {
      // check add data
      const premium = await UnlimitedPremiumModel.findById(id);
      premium.title = title
      premium.content = content
      await premium.save();
      return res.status(200).json({ success: true, message: 'Data updated successfully'});
    } catch (error) {
      return res.status(500).json({ success: false, message: 'something went wrong'});
    }
  
  }

// premium delete
exports.premiumDelete = async (req, res) => {
    const { id } = req.body;

    // validation
    if (!id) return res.status(400).json({ success: false, message: 'id is required'});

    const premium = await UnlimitedPremiumModel.findById(id);
    await premium.remove();
    return res.status(200).json({ success: true, message: 'premium deleted successfully'});
}