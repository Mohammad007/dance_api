const UserModel = require('../models/UserModel');
// const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

// signup account
exports.signup = async (req, res) => {
  try {
    const { fullname, email, password, loginType, refercode } = req.body;

    // validation
    if (!fullname) return res.status(400).json({ success: false, message: 'fullname is required'});
    if (!email) return res.status(400).json({ success: false, message: 'email is required'});
    if (!password) return res.status(400).json({ success: false, message: 'password is required'});
    if (!loginType) return res.status(400).json({ success: false, message: 'loginType is required'});
  
    // check if user already exists
    const user = await UserModel.findOne({ email });
    if (user) return res.status(400).json({ success: false, message: 'email already exists'});
  
    // password encryption
    // const salt = 10;
    // const hashedPassword = bcrypt.hashSync(password, salt);
  
    // otp generation
    const otp = Math.floor(Math.random() * (999999 - 100000) + 100000);
  
    // refer code generation
    const refercodeGenerated = Math.floor(Math.random() * (99999999 - 10000000) + 10000000);
  
    // create new user
    const newUser = new UserModel({
      fullname, 
      email, 
      loginType,
      otp: otp,
      password:password, 
      refercode: refercode,
      ownerReferCode: refercodeGenerated,
      profileImage: 'https://cdn-icons-png.flaticon.com/512/219/219983.png'
    });
    await newUser.save();
  
    // email send nodemailer
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp-relay.sendinblue.com',
        port: 587,
        auth: {
            user: 'bilalmalik1561@gmail.com',
            pass: '0Bpt1MCRhqVUsrnP'
        }
      });
    
      let info = await transporter.sendMail({
        from: 'bilalmalik1561@gmail.com', // sender address
        to: email, // list of receivers
        subject: "OTP Verification", // Subject line
        text: "OTP Verification: " + otp, // plain text body
        html: `<b>This is OTP ${otp} not share your otp other person</b>` // html body
      });
    
      console.log("Message sent: %s", info.messageId);
      console.log("OTP Verification :- ", otp)
    } catch (error) {
      console.log(error);
    }
  
    // expires otp in 60 seconds
    setTimeout(() => {
      UserModel.findOneAndUpdate({ email }, { otp: null }, (err, doc) => {
        if (err) return res.status(400).json({ success: false, message: 'otp expired'});
      }).exec();
    } , 60000);
    
    return res.status(200).json({ success: true, message: 'user created successfully'});
  } catch (error) {
    console.log(error);
  }
}

// login account
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email) return res.status(400).json({ success: false, message: 'email is required'});
    if (!password) return res.status(400).json({ success: false, message: 'password is required'});
  
    // check if user already exists
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: 'user does not exist'});
  
    // check status
    if (user.active === false) return res.status(400).json({ success: false, message: 'user is inactive'});
    
    // password validation
    if (user.password != password) return res.status(400).json({ success: false, message: 'invalid password'});
    
    // generate jwt token
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);
    return res.status(200).json({ success: true, user:user, token:token });
  } catch (error) {
    console.log(error);
  }
}

// verify account
exports.verify = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // validation
    if (!email) return res.status(400).json({ success: false, message: 'email is required'});
    if (!otp) return res.status(400).json({ success: false, message: 'otp is required'});
  
    // check if user already exists
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: 'user does not exist'});
  
    // otp validation
    if (otp !== user.otp) return res.status(400).json({ success: false, message: 'invalid otp'});
  
    // generate jwt token
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ success: true, user:user, token:token });
  } catch (error) {
    console.log(error);
  }
}

// reset otp account
exports.resetOtp = async (req, res) => {
  try {
    const { email } = req.body;

    // validation
    if (!email) return res.status(400).json({ success: false, message: 'email is required'});
  
    // check if user already exists
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: 'user does not exist'});
  
    // otp generation
    const otp = Math.floor(Math.random() * (999999 - 100000) + 100000);
  
    // email send nodemailer
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp-relay.sendinblue.com',
        port: 587,
        auth: {
            user: 'bilalmalik1561@gmail.com',
            pass: '0Bpt1MCRhqVUsrnP'
        }
      });
    
      let info = await transporter.sendMail({
        from: 'bilalmalik1561@gmail.com', // sender address
        to: email, // list of receivers
        subject: "OTP Verification", // Subject line
        text: "OTP Verification: " + otp, // plain text body
        html: `<b>This is OTP ${otp} not share your otp other person</b>` // html body
      });
    
      console.log("Message sent: %s", info.messageId);
    } catch (err) {
      console.log(err);
    }
    // email send nodemailer
  
    // update otp
    await UserModel.findOneAndUpdate({ email }, { otp: otp });
  
    // expires otp in 60 seconds
    setTimeout(() => {
      UserModel.findOneAndUpdate({ email }, { otp: null }, (err, doc) => {
        if (err) return res.status(400).json({ success: false, message: 'otp expired'});
      }).exec();
    } , 60000);
  
    return res.status(200).json({ success: true, message: 'otp reset successfully'});
  } catch (error) {
    console.log(error);
  }
}

// update profile account 
exports.updateProfile = async (req, res) => {
  try {
    const { fullname, phone } = req.body;
    const { id } = req.user;
  
    // validation
    if (!fullname) return res.status(400).json({ success: false, message: 'fullname is required'});
    if (!phone) return res.status(400).json({ success: false, message: 'phone is required'});
    //if (!password) return res.status(400).json({ success: false, message: 'password is required'});
  
    // check if user already exists
    const user = await UserModel.findById(id);
    if (!user) return res.status(400).json({ success: false, message: 'user does not exist'});
  
    // update user
    user.fullname = fullname;
    user.phone = phone;
    // user.password = hashedPassword;
    await user.save();
    return res.status(200).json({ success: true, message: 'user updated successfully'});
  } catch (error) {
    console.log(error);
  }
}

// profile account
exports.profile = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await UserModel.findById(id);
    return res.status(200).json({ success: true, user:user });
  } catch (error) {
    console.log(error);
  }
}

// forgot password account
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // validation
    if (!email) return res.status(400).json({ success: false, message: 'email is required'});
  
    // check if user already exists
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: 'user does not exist'});
  
    // otp generation
    const otp = Math.floor(Math.random() * (999999 - 100000) + 100000);
  
    // email send nodemailer
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp-relay.sendinblue.com',
        port: 587,
        auth: {
            user: 'bilalmalik1561@gmail.com',
            pass: '0Bpt1MCRhqVUsrnP'
        }
      });
    
      let info = await transporter.sendMail({
        from: 'bilalmalik1561@gmail.com', // sender address
        to: email, // list of receivers
        subject: "OTP Verification", // Subject line
        text: "OTP Verification: " + otp, // plain text body
        html: `<b>This is OTP ${otp} not share your otp other person</b>` // html body
      });
    
      console.log("Message sent: %s", info.messageId);
    } catch (err) {
      console.log(err);
    }
    // email send nodemailer
  
    // update otp
    await UserModel.findOneAndUpdate({ email }, { otp: otp });
  
    // expires otp in 60 seconds
    setTimeout(() => {
      UserModel.findOneAndUpdate({ email }, { otp: null }, (err, doc) => {
        if (err) return res.status(400).json({ success: false, message: 'otp expired'});
      }).exec();
    } , 60000);
  
    return res.status(200).json({ success: true, user:user, message: 'otp send successfully'});
  } catch (error) {
    console.log(error);
  }
}

// new password account
exports.newPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email) return res.status(400).json({ success: false, message: 'email is required'});
    if (!password) return res.status(400).json({ success: false, message: 'password is required'});
  
    // check if user already exists
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: 'user does not exist'});
  
    // update user
    user.password = password;
    await user.save();
    return res.status(200).json({ success: true, message: 'password updated successfully'});
  } catch (error) {
    console.log(error);
  }
}

// delete profile account
exports.deleteProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await UserModel.findById(id);
    await user.remove();
    return res.status(200).json({ success: true, message: 'user deleted successfully'});
  } catch (error) {
    console.log(error);
  }
}

// upload profile image
exports.uploadProfileImage = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await UserModel.findById(id);
    if (!user) return res.status(400).json({ success: false, message: 'user does not exist'});
    user.profileImage = req.file.path;
    await user.save();
    return res.status(200).json({ success: true, message: 'profile image uploaded successfully'});
  } catch (error) {
    console.log(error);
  }
}

// users list 
exports.userslist = async (req, res) => {
  try {
      const users = await UserModel.find();
      if(users){
          return res.status(200).json({ success: true, users });
      } else {
          return res.status(200).json({ success: false, users:[] });
      }
  } catch (error) {
      console.log(error);
  }
}
