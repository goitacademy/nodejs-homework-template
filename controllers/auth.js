const {User}=require("../models/user");
const ctrlWrapper=require("../helpers/ctrlWrapper");
const bcryptjs=require("bcryptjs");
const jwt=require("jsonwebtoken");
const {SECRET_KEY}=process.env;

const register= async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email});

    if(user){
        throw new Error("Email in use");
    };
const hashPassword=await bcryptjs.hash(password,10);
    const newUser=await User.create({...req.body,password:hashPassword});

    res.status(201).json({
        email:newUser.email,
        name:newUser.name,
    })
};

const login=async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user){
        throw new Error("Email or password is wrong");
    }
    const passwordCompare=await bcryptjs.compare(password,user.password)

if (!passwordCompare){
    throw new Error("Email or password is wrong")
}

const payload={
    id:user._id,
};
const token=jwt.sign(payload,SECRET_KEY,{expiresIn:"23h"});
await User.findByIdAndUpdate(user._id, {token});
res.json({
    token,
})
};

const getCurrent = async(req, res)=> {
    const {email, name} = req.user;

    res.json({
        email,
        name,
    })
}

const logout = async(req, res) => {
    const {_id} = req.user;
    await User.findByIdAndUpdate(_id, {token: ""});

    res.json({
        message: "Logout success"
    })
}

module.exports={
    register:ctrlWrapper(register),
    login:ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
}