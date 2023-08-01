// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");

// const User = require("../models/user");
// const HttpError = require("../helpers/HttpError");
// const { ctrlWrapper } = require("../decorators/index");

// dotenv.config();
// const {JWT_SECRET} = process.env;

// const signup = async(req, res)=> {
//     const {email, password} = req.body;
//     const user = await User.findOne({email});
     

//     if(user) {
//         throw HttpError(409, `Email ${email} in use`);
//     }

//     const hashPassword = await bcrypt.hash(password, 10);
//     const newUser = await User.create({...req.body, password: hashPassword});
 
//     res.status(201).json({        
//         email: newUser.email,
//         subscription: newUser.subscription,
//     })
// }

// const signin = async(req, res)=> {
//     const {email, password} = req.body;
//     const user = await User.findOne({email});
//     if(!user) {
//         throw HttpError(401, "email invalid");
//     };  

//     const passwordCompare = await bcrypt.compare(password, user.password); 
     
//     if(!passwordCompare) {
//         throw HttpError(401, "password invalid");
//     }

//     const payload = {
//         id: user._id,
//     }

//     const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "72h"});
//     await User.findByIdAndUpdate(user._id, {token});

//     res.json({
//         token,
//     })
// };

// const getCurrent = (req, res)=> {
//     const {email, subscription} = req.user;

//     res.json({
//         email, subscription
//     })
// };

// const signout = async(req, res) => {
//     const {_id} = req.user;
//     await User.findByIdAndUpdate(_id, {token: ""});    
    
//     res.status(204).json({
//         message: "No Content"
//     });
// };

// module.exports = {
//     signup: ctrlWrapper(signup),
//     signin: ctrlWrapper(signin),
//     getCurrent: ctrlWrapper(getCurrent),
//     signout: ctrlWrapper(signout),
// };