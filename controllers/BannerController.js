const BannerModel = require('../models/BannerModel');

// get all banners
exports.getAllBanner = async (req, res) => {
    try {
        const banners = await BannerModel.find();
        if(banners){
            return res.status(200).json({ success: true, banners });
        } else {
            return res.status(200).json({ success: false, banners:[] });
        }
    } catch (error) {
        console.log(error);
    }
}

// add banners image and url
exports.addBanner = async (req, res) => {
    try {
        const { url } = req.body;

        // validation
        if (!url) return res.status(400).json({ success: false, message: 'url is required'});
    
        const banners = new BannerModel({
            url: url,
            image: req.file.path,           
        });
        await banners.save();
        return res.status(200).json({ success: true, message: 'banner added successfully'});
    } catch (error) {
        console.log(error);
    }
}

// update banners
exports.updateBanner = async (req, res) => {
    try {
        const { url, active } = req.body;
    
        const banners = await BannerModel.findByIdAndUpdate(req.params.id, {
            url: url,
            active: active,
            image: req.file.path,
        });
        return res.status(200).json({ success: true, message: 'banner updated successfully'});
    } catch (error) {
        console.log(error);
    }
}

// delete banners
exports.deleteBanner = async (req, res) => {
    try {
        const { id } = req.params;
        const banner = await BannerModel.findById(id);
        if (!banner) return res.status(400).json({ success: false, message: 'banner does not exist'});
        await banner.remove();
        return res.status(200).json({ success: true, message: 'banner deleted successfully'});
    } catch (error) {
        console.log(error);
    }
}


