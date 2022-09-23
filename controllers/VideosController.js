const VideosModel = require('../models/VideosModel');

// get all Videos
exports.getAllVideos = async (req, res) => {
    try {
        const videoslist = await VideosModel.find();
        return res.status(200).json({ success: true, videoslist });
    } catch (error) {
        console.log(error); 
    }
}

// add Videos
exports.addVideos = async (req, res) => {

    const { categoryID, videos } = req.body;

    // validation
    if (!categoryID) return res.status(400).json({ success: false, message: 'categoryID is required'});
    if (!videos) return res.status(400).json({ success: false, message: 'videos is required'});

    const checkVideo = await VideosModel.findOne({ categoryID })
    if (checkVideo) return res.status(400).json({ success: false, message: 'videos list already exists'});

    const videoslist = new VideosModel({ 
        categoryID: categoryID,
        videos: videos
    });
    await videoslist.save();
    return res.status(200).json({ success: true, message: 'videos added successfully'});
}

// update Videos 
exports.updateVideos = async (req, res) => {
    const { categoryID, videos } = req.body;

    const videoslist = await VideosModel.findByIdAndUpdate(req.params.id, {
        categoryID: categoryID,
        videos: videos
    });
    
    return res.status(200).json({ success: true, message: 'videos updated successfully'});
}

// delete Videos
exports.deleteVideos = async (req, res) => {
    const { id } = req.params;
    const videoslist = await VideosModel.findById(id);
    if (!videoslist) return res.status(400).json({ success: false, message: 'videos does not exist'});
    await videoslist.remove();
    return res.status(200).json({ success: true, message: 'videos deleted successfully'});
}