const CityModel = require('../models/CityModel');

// get all city
exports.getAllCity = async (req, res) => {
    const citys = await CityModel.find();
    return res.status(200).json({ success: true, citys });
}

// get city by name
exports.getCityByName = async (req, res) => {
    const { cityName } = req.body;

    // validation
    if (!cityName) return res.status(400).json({ success: false, message: 'cityName is required'});

    const city = await CityModel.findOne({ cityName: cityName });
    if (!city) return res.status(400).json({ success: false, message: 'city does not exist'});

    return res.status(200).json({ success: true, city });

}

// add city name and image
exports.addCity = async (req, res) => {
    const { cityName } = req.body;

    // validation
    if (!cityName) return res.status(400).json({ success: false, message: 'cityName is required'});

    const city = new CityModel({ 
        cityName: cityName,
        profileImage: req.file.path,           
    });
    await city.save();
    return res.status(200).json({ success: true, message: 'city added successfully'});
}

// update city 
exports.updateCity = async (req, res) => {
    const { cityName } = req.body;

    // validation
   // if (!cityName) return res.status(400).json({ success: false, message: 'cityName is required'});

    const city = await CityModel.findByIdAndUpdate(req.params.id, {
        cityName: cityName,
        profileImage: req.file.path,
    });
    return res.status(200).json({ success: true, message: 'city updated successfully'});
}

// delete city
exports.deleteCity = async (req, res) => {
    const { id } = req.params;
    const city = await CityModel.findById(id);
    if (!city) return res.status(400).json({ success: false, message: 'city does not exist'});
    await city.remove();
    return res.status(200).json({ success: true, message: 'city deleted successfully'});
}


