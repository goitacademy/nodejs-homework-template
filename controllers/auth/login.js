const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { User } = require('../../models');
const { HttpError } = require('../../helpers');
const {SECRET_KEY} = process.env;


const login = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        throw new HttpError(401, 'Email or password is wrong');
    };
    const passwordCompare = await bcrypt.compareSync(password, user.password);
    
    if(!passwordCompare){
        throw new HttpError(401, 'Email or password is wrong');
    };

    const payload = {
        id: user._id,
    };
    
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '23h'});
    await User.findByIdAndUpdate(user._id, {token})

    res.json({
        token,
        user:{
            email: user.email,
            subscription: "starter"
        }
    })
};

module.exports = login;