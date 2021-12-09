const { Unauthorized } = require('http-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User } = require('../../models');

const { SECRET_KEY } = process.env

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw new Unauthorized(`Email ${email} not found`);
    }
    const passCompare = bcrypt.compareSync(password, user.password);
    if (!passCompare) {
        throw new Unauthorized('Password wrong');
    }

    const payload = {
        id: user._id
    }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
    res.json({
        status: 'success',
        code: 200,
        data: {
            token
        }
    })
}

module.exports = login;