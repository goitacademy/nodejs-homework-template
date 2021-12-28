const {Unauthorized} = require("http-errors");
const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");

const {User} = require("../../models");

const {SECRET_KEY} = process.env;

const login = async(req, res)=> {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user || !user.comparePassword(password)){
        throw new Unauthorized("Email or password is wrong");
    }
    // const passCompare = bcrypt.compareSync(password, user.password);
    // if(!user || !passCompare){
    //     throw new Unauthorized("Email or password is wrong");
    // }
    // if(!user){
    //     throw new Unauthorized(`Email ${email} not found`);
    // }
    // const passCompare = bcrypt.compareSync(password, user.password);
    // if(!passCompare){
    //     throw new Unauthorized("Password wrong");
    // }
    const payload = {
        id: user._id
    };
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "1h"});
    await User.findByIdAndUpdate(user._id, {token});
    res.json({
        status: "success",
        code: 200,
        data: {
            token
        }
    })
}

module.exports = login;