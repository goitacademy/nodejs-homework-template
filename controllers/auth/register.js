const {Conflict} = require("http-errors");
const bcrypt = require("bcryptjs");

const {User} = require("../../model");

const register = async(req, res)=> {

    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(user){
        throw new Conflict("Email in use")
    }

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const newUser = await User.create({email, password: hashPassword});

    newUser.save();

    res.status(201).json({
        status: "success",
        code: 201,
        data: {
            user: {
                email,
                subscription: "starter",
            },
        }
    })
}

module.exports = register;