const CategoriesModel = require('../models/CategoriesModel');

// get all Categories
exports.getAllCategories = async (req, res) => {
    try {
        const categorys = await CategoriesModel.find();
        return res.status(200).json({ success: true, categorys });
    } catch (error) {
        console.log(error); 
    }
}

// get Categories by name
exports.getCategoriesByName = async (req, res) => {
    const { categoryName } = req.body;

    // validation
    if (!categoryName) return res.status(400).json({ success: false, message: 'categoryName is required'});

    const category = await CategoriesModel.findOne({ categoryName: categoryName });
    if (!category) return res.status(400).json({ success: false, message: 'category does not exist'});

    return res.status(200).json({ success: true, category });

}

// add Categories name and image
exports.addCategories = async (req, res) => {

    const { categoryName, videoUrl, title, titleName, timeDate, about } = req.body;

    // validation
    if (!categoryName) return res.status(400).json({ success: false, message: 'categoryName is required'});
    if (!videoUrl) return res.status(400).json({ success: false, message: 'videoUrl is required'});
    if (!title) return res.status(400).json({ success: false, message: 'title is required'});
    if (!titleName) return res.status(400).json({ success: false, message: 'titleName is required'});
    if (!timeDate) return res.status(400).json({ success: false, message: 'timeDate is required'});
    if (!about) return res.status(400).json({ success: false, message: 'about is required'});

    const checkCategory = await CategoriesModel.findOne({ categoryName })
    if (checkCategory) return res.status(400).json({ success: false, message: 'category already exists'});

    const categorys = new CategoriesModel({ 
        categoryName: categoryName,
        image: req.file.path,  
        videoUrl: videoUrl,
        title: title,
        titleName: titleName, 
        timeDate: timeDate,
        about: about
    });
    await categorys.save();
    return res.status(200).json({ success: true, message: 'category added successfully'});
}

// update Categories 
exports.updateCategories = async (req, res) => {
    const { categoryName, videoUrl, title, titleName, timeDate, about } = req.body;

    // validation
    // if (!categoryName) return res.status(400).json({ success: false, message: 'categoryName is required'});

    const categorys = await CategoriesModel.findByIdAndUpdate(req.params.id, {
        categoryName: categoryName,
        image: req.file.path,
        videoUrl: videoUrl,
        title: title,
        titleName: titleName, 
        timeDate: timeDate,
        about: about
    });
    
    return res.status(200).json({ success: true, message: 'category updated successfully'});
}

// delete Categories
exports.deleteCategories = async (req, res) => {
    const { id } = req.params;
    const categorys = await CategoriesModel.findById(id);
    if (!categorys) return res.status(400).json({ success: false, message: 'category does not exist'});
    await categorys.remove();
    return res.status(200).json({ success: true, message: 'category deleted successfully'});
}