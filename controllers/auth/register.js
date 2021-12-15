const { Conflict } = require('http-errors');
const gravatar = require('gravatar');

const { User } = require('../../models');

const register = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw new Conflict(`User with ${email} already exist`)
    }
    const avatarUrl = gravatar.url(email);
    const newUser = new User({ name, email, avatarUrl });

    newUser.setPassword(password);

    newUser.save();

    res.status(201).json({
        status: 'success',
        code: 201,
        data: {
            user: {
                name,
                email,
                avatarUrl
            }
        }
    })

}

module.exports = register;
