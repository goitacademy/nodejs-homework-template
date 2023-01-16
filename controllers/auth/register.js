const { User } = require("../../models");
const { Conflict } = require("http-errors");




const register = async (req, res) => {
    const { email, password, subscription } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw new Conflict(`Use with ${email} alredy exist`)
    }
    const newUser = new User({ email, subscription });
    newUser.setPassword(password)
    newUser.save();
    
    res.status(201).json({
        status: 'success',
        code: 201,
        data: {
            user: {
            email: "example@example.com",
            subscription: "starter"
            }
        }
    })
}

module.exports = register;