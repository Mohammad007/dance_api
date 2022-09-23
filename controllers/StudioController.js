const StudioModel = require('../models/StudioModel');

// get studio by user id
exports.getStudiosList = async (req, res) => {
    const studios = await StudioModel.find();
    if(!studios) return res.status(400).json({ success: false, message: 'No studios found'});
    return res.status(200).json({ success: true, studios });
}

// get studio by user id
exports.getAllStudios = async (req, res) => {
    // const { id } = req.user;
    const id = req.body.id
    const studios = await StudioModel.findOne({_id:id});
    if(!studios) return res.status(400).json({ success: false, message: 'No studios found'});
    return res.status(200).json({ success: true, studios });
}

// studio active and inactive
exports.activeAndInactiveStudio = async (req, res) => {
    const { activeAndInactive, id } = req.body;
    // const { id } = req.user;
    if(!activeAndInactive) return res.status(400).json({ success: false, message: 'activeAndInactive is required'});
    const studio = await StudioModel.findById(id);
    if(!studio) return res.status(400).json({ success: false, message: 'No studio found'});
    studio.status = activeAndInactive;
    await studio.save();
    return res.status(200).json({ success: true, message: 'Studio status successfully'});
}

// delete studio
exports.deleteStudio = async (req, res) => {
    const { id } = req.body;
    const studio = await StudioModel.findById(id);
    if(!studio) return res.status(400).json({ success: false, message: 'No studio found'});
    await studio.remove();
    return res.status(200).json({ success: true, message: 'Studio deleted successfully'});
}

// add studio
exports.addStudio = async (req, res) => {
    const { studioName, description, category, address, city, state } = req.body;
    // const { id } = req.user;

    // validation
    if (!studioName) return res.status(400).json({ success: false, message: 'studioName is required'});
    if (!description) return res.status(400).json({ success: false, message: 'description is required'});
    if (!category) return res.status(400).json({ success: false, message: 'category is required'});
    if (!address) return res.status(400).json({ success: false, message: 'address is required'});
    if (!city) return res.status(400).json({ success: false, message: 'city is required'});
    if (!state) return res.status(400).json({ success: false, message: 'state is required'});
    // if (!banner) return res.status(400).json({ success: false, message: 'banner is required'});
    // if (!image) return res.status(400).json({ success: false, message: 'image is required'});

    // already studio exists
    const studioCheck = await StudioModel.findOne({ studioName: studioName });
    if(studioCheck) return res.status(400).json({ success: false, message: 'Studio already exists'});

    // multiple images insert into array
    const images = [];
    for(let i = 0; i < req.files.length; i++) {
        images.push(req.files[i].path);
    }
    const studio = new StudioModel({
        studioName,
        description,
        category,
        address,
        city,
        state,
        images: images,
        banner: 'ok'
    });
    await studio.save();
    return res.status(200).json({ success: true, message: 'Studio added successfully'});
}

// update studio
exports.updateStudio = async (req, res) => {
    const { studioName, description, category, address, city, state } = req.body;
    const { id } = req.params;

    const studio = await StudioModel.findById(id);

    studio.studioName = studioName;
    studio.description = description;
    studio.category = category;
    studio.address = address;
    studio.city = city;
    studio.state = state;
    await studio.save();
    return res.status(200).json({ success: true, message: 'Studio updated successfully'});
}

// update studio images
exports.updateStudioImages = async (req, res) => {
    const { id } = req.body;
    const studio = await StudioModel.findById(id);
    if(!studio) return res.status(400).json({ success: false, message: 'No studio found'});
    const images = [];
    for(let i = 0; i < req.files.length; i++) {
        images.push(req.files[i].path);
    }
    studio.images = images;
    await studio.save();
    return res.status(200).json({ success: true, message: 'Studio images updated successfully'});
}