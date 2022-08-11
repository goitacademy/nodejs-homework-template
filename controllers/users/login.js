const jwt = require("jsonwebtoken");
const {User, userJoiSchema} = require("../../models/user");
const {SECRET_KEY} = process.env;

const login = async (req, res) => {
    const {error} = userJoiSchema.validate(req.body);
    if(error) {
        const error = new Error("Bad Request"); 
        error.status = 400;
        throw error;
    }
    const {email, password} = req.body;
    const user = await User.findOne({email});
        if(!user || !user.comparePassword(password)) {
        const error = new Error("Email or password is wrong"); 
        error.status = 401;
        throw error;
    }
    const payload = {
        id: user._id
    }
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