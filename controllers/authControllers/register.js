const User = require('../../models/users');
const bcrypt = require('bcryptjs')

const {Conflict} = require('http-errors')

const register = async (req, res) => {
    const { email, password, subscription } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw new Conflict(`User with ${email} is already exist`)
    }
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    result = User.create({ email, password: hashPassword, subscription });
    res.status(201).json({
        status: 'success',
        code: 201,
        data: {
            user:{ email, password, subscription }
        }
    })
}

module.exports = register