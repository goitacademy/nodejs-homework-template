const { Conflict } = require("http-errors");

const { User } = require("../../model");

const signup = async (req, res) => {
    const { password, email } = req.body;
    const user = await User.findOne({email});
    if(user) {
        throw new Conflict(`User with ${email} already exist`);
    }
    const result = await User.create({email, password});
    res.status(201).json({
        status: "success",
        code: 201,
        data: {
            user: {
                email,
                subscription: "starter"
            }
        }
    })
}

module.exports = signup;