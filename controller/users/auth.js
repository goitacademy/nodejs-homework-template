const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

const { User } = require('../../models');

const { HttpError, ctrlWrapper } = require("../../helper");



const register = async (req, res) => {
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

const login = async (req, res) => {

const { email, password } = req.body;

const user = await User.findOne({ email });

if(!user){
    throw HttpError(401, "Email or password invalid");
}

const passwordCompare = await bcrypt.compare(password, user.password);

if(!passwordCompare){
    throw HttpError(401, "Email or password invalid");
}

const payload = {
    id: user._id,
}

const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '23h'});
await User.findByIdAndUpdate(user.id, {token});

res.json({
    token,
})

}

const getCurrent = async(req,res)=>{
    const {email, subscription} = req.user;

    res.json({
        email,
        subscription,
        })
}

const logout = async(req,res)=>{
 const {_id} = req.user;
 await User.findByIdAndUpdate(_id, {token: ""});

 res.json({
    mesaage: "Logout success"
 })
}



module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
}




