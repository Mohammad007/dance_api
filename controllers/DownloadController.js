const DownloadModel = require('../models/DownloadModel');

// get all videos
exports.getAllDownload = async (req, res) => {
    const { id } = req.user;
    const downloads = await DownloadModel.find({ user: id });
    return res.status(200).json({ success: true, downloads });
}

// get video by id
exports.getDownloadById = async (req, res) => {
    const { id } = req.params;
    const download = await DownloadModel.findById(id);
    if(!download) return res.status(400).json({ success: false, message: 'download does not exist'});
    return res.status(200).json({ success: true, download });
}

// add video
exports.addDownload = async (req, res) => {
    const { name, format, size, category } = req.body;
    const { id } = req.user;

    // validation
    if (!name) return res.status(400).json({ success: false, message: 'name is required'});
    if (!format) return res.status(400).json({ success: false, message: 'format is required'});
    if (!size) return res.status(400).json({ success: false, message: 'size is required'});
    if (!category) return res.status(400).json({ success: false, message: 'category is required'});

    const download = new DownloadModel({
        name: name,
        format: format,
        size: size,
        category: category,
        user: id,
    });
    await download.save();
    return res.status(200).json({ success: true, message: 'download added successfully'});
}

// delete video
exports.deleteDownload = async (req, res) => {
    const { id } = req.params;
    const download = await DownloadModel.findById(id);
    if (!download) return res.status(400).json({ success: false, message: 'download does not exist'});
    await download.remove();
    return res.status(200).json({ success: true, message: 'download deleted successfully'});
}