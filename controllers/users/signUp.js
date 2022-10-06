const { Conflict } = require('http-errors');

const { User } = require('../../models');

const signUp = async (req, res) => {
    const { email, password, subscription = "starter" } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw Conflict("Email in use")
    }
    const newUser = new User({ email });
    newUser.hashPassword(password);
    newUser.save();

    res.status(201).json({
        status: 'success',
        code: 201,
        data: {
            user: {
                email,
                subscription
            }
        }
    })
};

module.exports = signUp;