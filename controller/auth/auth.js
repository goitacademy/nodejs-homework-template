const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const {SECRET_KEY} = process.env

const { User } = require('../../models');

const { HttpError, ctrlWrapper } = require("../../helper");

const register = async(req, res) => {
const {email, password} = req.body;
const user = await User.findOne({email});

if(user){
    throw HttpError(409, "Email already in use");
}

const hashPassword = await bcrypt.hash(password, 10);
const newUser = await User.create({...req.body, password: hashPassword});

 res.status(201).json({
    email: newUser.email,
    name: newUser.name,
 })
} 

const login = async(req, res) => {
const {email, password} = req.body;
const user = await User.findOne({email});
if(!user){
    throw HttpError(401, "Email or password invalid");
}
const passwordConpare = await bcrypt.compare(password, user.password);
if(!passwordConpare){
    throw HttpError(401, "Email or password invalid");
}

const payload = {
    id: user._id,
}
const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '23h'})

res.json({token,})
}


module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
}




// const createHashPassword = async(password) => {
//   // const salt = await bcryptjs.genSalt(10);
//   // console.log(salt);
//  const result = await bcryptjs.hash(password, 10);
// //  console.log(result);
// const compareResult1 = await bcryptjs.compare(password, result);
//  console.log(compareResult1);
// const compareResult2 = await bcryptjs.compare("123456", result);
// console.log(compareResult2);
// }

// createHashPassword('1234567');