const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");

const { User } = require("../../model");

const signup = async (req, res) => {
    const { password, email, subscription} = req.body;
    const user = await User.findOne({email});
    if(user) {
        throw new Conflict(`User with ${email} already exist`);
    }

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const result = await User.create({email, password: hashPassword, subscription});
    res.status(201).json({
        status: "success",
        code: 201,
        data: {
            user: {
                email: result.email,
                subscription: result.subscription, 
            }
        }
    })
}

module.exports = signup;