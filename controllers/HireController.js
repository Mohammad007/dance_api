const HireModel = require('../models/HireModel');

// get hire list
exports.getHireList = async (req, res) => {
    try {
        const hirelist = await HireModel.find();
        if(!hirelist) return res.status(400).json({ success: false, message: 'No Hire User found!'});
        return res.status(200).json({ success: true, hirelist });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Something went wrong!' });
    }
}

// get hire by user id
exports.getHireById = async (req, res) => {
    try {
        const { id } = req.params;
        const hireone = await HireModel.findById(id);
        if(!hireone) return res.status(400).json({ success: false, message: 'No Hire User found'});
        return res.status(200).json({ success: true, hireone });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Something went wrong!' });
    }
}

// add hire us
exports.addHire = async (req, res) => {
    const { name, designation, about } = req.body;

    // validation
    if (!name) return res.status(400).json({ success: false, message: 'name is required'});
    if (!designation) return res.status(400).json({ success: false, message: 'designation is required'});
    if (!about) return res.status(400).json({ success: false, message: 'about is required'});

    try {
        // multiple images insert into array
        const images = [];
        for(let i = 0; i < req.files.imagelist.length; i++) {
            images.push(req.files.imagelist[i].path);
        }
        const hireus = new HireModel({
            name,
            designation,
            about,
            profileImage: req.files.profileImage[0].path,
            footerImage: req.files.footerImage[0].path,
            imagelist: images,
        });
        await hireus.save();
        return res.status(200).json({ success: true, message: 'Hire User added successfully'});
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Something went wrong!' });
    }
}

// hire us active and inactive
exports.activeAndInactiveHire = async (req, res) => {
    const { activeAndInactive, id } = req.body;

    if(!activeAndInactive) return res.status(400).json({ success: false, message: 'activeAndInactive is required'});
    if(!id) return res.status(400).json({ success: false, message: 'id is required'});

    try {
        const hireus = await HireModel.findById(id);
        if(!hireus) return res.status(400).json({ success: false, message: 'No Hire us found'});
        hireus.status = activeAndInactive;
        await hireus.save();
        return res.status(200).json({ success: true, message: 'Hire us status successfully'});
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Something went wrong!' });
    }
}

// delete hire us
exports.deleteHire = async (req, res) => {
    const { id } = req.body;

    // validation
    if (!id) return res.status(400).json({ success: false, message: 'id is required'});

    try {
        const hireus = await HireModel.findById(id);
        if(!hireus) return res.status(400).json({ success: false, message: 'No Hire Us found'});
        await hireus.remove();
        return res.status(200).json({ success: true, message: 'Hire Us User deleted successfully'});
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Something went wrong!' });
    }
}

// update hire us
exports.updateHire = async (req, res) => {
    const { name, designation, about, status } = req.body;
    const { id } = req.params;

    try {
        const hireus = await HireModel.findById(id);

        hireus.name = name;
        hireus.designation = designation;
        hireus.about = about;
        hireus.status = status;
        await hireus.save();
        return res.status(200).json({ success: true, message: 'Hire us updated successfully'});
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Something went wrong!' });
    }
}

// profileImage upload
exports.profileImageUpdate = async (req, res) => {
    const { id } = req.body;

    // validation
    if (!id) return res.status(400).json({ success: false, message: 'id is required'});

    try {
        const hireus = await HireModel.findById(id);
        hireus.profileImage = req.file.path,
        await hireus.save();
        return res.status(200).json({ success: true, message: 'Profile Image Update successfully'});
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Something went wrong!' });
    }
}

// footerImage upload
exports.footerImageUpdate = async (req, res) => {
    const { id } = req.body;

    // validation
    if (!id) return res.status(400).json({ success: false, message: 'id is required'});

    try {
        const hireus = await HireModel.findById(id);
        hireus.footerImage = req.file.path,
        await hireus.save();
        return res.status(200).json({ success: true, message: 'Footer Image Update successfully'});
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Something went wrong!' });
    }
}

// update studio images
exports.imageListUpdate = async (req, res) => {
    const { id } = req.body;

    // validation
    if (!id) return res.status(400).json({ success: false, message: 'id is required'});

    try {
        const hireus = await HireModel.findById(id);
        if(!hireus) return res.status(400).json({ success: false, message: 'No Hire Us found'});
        const images = [];
        for(let i = 0; i < req.files.length; i++) {
            images.push(req.files[i].path);
        }
        hireus.imagelist = images;
        await hireus.save();
        return res.status(200).json({ success: true, message: 'Hire images updated successfully'});
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Something went wrong!' });
    }
}