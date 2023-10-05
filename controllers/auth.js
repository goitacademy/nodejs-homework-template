const {User}=require("../models/user");
const ctrlWrapper=require("../helpers/ctrlWrapper");

const register= async(req,res)=>{
    const {email}=req.body;
    const user=await User.findOne({email});

    if(user){
        throw new Error("Email already in use");
    };

    const newUser=await User.create(req.body);

    res.status(201).json({
        email:newUser.email,
        name:newUser.name,
    })
}


module.exports={
    register:ctrlWrapper(register),
}