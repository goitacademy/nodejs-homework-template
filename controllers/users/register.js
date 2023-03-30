const {User} = require("../../models/users");
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');


const register = async (req, res) => {
    const {email, password } = req.body;

    const user = await User.findOne({email});

    if (user) {
        return res.status(409).json({
            message: 'Email is used'
        });
    }
    const avatarURL = gravatar.url(email);
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
     await User.create({email,password: hashPassword,avatarURL});
    // console.log(result)

    res.status(201).json({
        user:{
            email,
            "subscription": "starter",
            avatarURL
        }
    })
}

module.exports = register;