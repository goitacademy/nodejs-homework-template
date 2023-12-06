const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { User } = require("../../models/user");
const {HttpError, ctrlWrapper} = require("../../helpers/index");


const register = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(user){
        throw HttpError(409, "Email already in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email, {
        s: '250',
        r: 'g',
        d: 'identicon'
    });
    const newUser = await User.create({...req.body, password: hashPassword, avatarURL });

    res.status(201).send({
        username: newUser.username,
        email: newUser.email,
    })
};


module.exports = {
    register: ctrlWrapper(register)
};