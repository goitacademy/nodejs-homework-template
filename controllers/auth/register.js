const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

const {User} = require("../../models/user");

const { HttpError, ctrlWrapper } = require("../../helpers");

const register = async(req, res)=> {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(user){
        throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const avatarURL = gravatar.url(email,
        { s: "250", r: "g", d: "wavatar" },
        false
        );

    const newUser = await User.create({...req.body, password: hashPassword,avatarURL});

    res.status(201).json({
        email: newUser.email,
        name: newUser.name,
    })
}

module.exports = { register: ctrlWrapper(register) };