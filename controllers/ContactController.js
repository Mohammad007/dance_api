const ContactModel = require('../models/ContactModel');
const nodemailer = require("nodemailer");

// get all contact
exports.getAllContact = async (req, res) => {
    const contacts = await ContactModel.find();
    return res.status(200).json({ success: true, contacts });
}

// add contact mobile and message
exports.addContact = async (req, res) => {
    const { mobile, msg } = req.body;

    // validation
    if (!mobile) return res.status(400).json({ success: false, message: 'mobile is required'});
    if (!msg) return res.status(400).json({ success: false, message: 'msg is required'});

    const contacts = new ContactModel({
        mobile: mobile,
        msg: msg,           
    });
    await contacts.save();
    return res.status(200).json({ success: true, message: 'contact added successfully'});
}

// update contact
exports.updateContact = async (req, res) => {
    const { mobile, msg } = req.body;

    // validation
    if (!mobile) return res.status(400).json({ success: false, message: 'mobile is required'});
    if (!msg) return res.status(400).json({ success: false, message: 'msg is required'});

    const contacts = await ContactModel.findByIdAndUpdate(req.params.id, {
        mobile: mobile,
        msg: msg,  
    });
    return res.status(200).json({ success: true, message: 'contact updated successfully'});
}

// delete contact
exports.deleteContact = async (req, res) => {
    const { id } = req.params;
    const contact = await ContactModel.findById(id);
    if (!contact) return res.status(400).json({ success: false, message: 'contact does not exist'});
    await contact.remove();
    return res.status(200).json({ success: true, message: 'contact deleted successfully'});
}