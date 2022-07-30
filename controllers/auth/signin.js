const bcrypt = require('bcryptjs');
const { User, shemas } = require('../../models/user');
const { createError } = require('../../helpers');

const signin = async (req, res) => { 
const { error } = shemas.signup.validate(req.body);
    if (error) { 
        throw createError(400, error.message);
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) { 
        throw createError(401, `Email or password is wrong`);
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) { 
        throw createError(401, `Email or password is wrong`);
    }
    const token = 'sdfsdfdfsdfd';
    res.json({
        token,
    });
}
module.exports = signin;