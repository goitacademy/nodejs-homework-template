const User = require('../../models/users');
const bcrypt = require('bcryptjs');
const { Unauthorized } = require('http-errors');
const jvt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;


const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user === null) {
        throw new Unauthorized(`User with email${email} not found`);
    }
    const passCompare = bcrypt.compareSync(password, user.password);
    if (!passCompare)
        {
        throw new Unauthorized('Password wrong');
    }
    const payload = {
        id: user._id
    }
    const token = jvt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
    await User.findByIdAndUpdate(user._id,{token})
    res.json({
        status: "success",
        code: 200,
        data: {
            token
        }
    })
}

module.exports = login