const { User } = require('../../models');
const bcrypt = require('bcrypt');

const register = async (req, res, next) => {
    const { email, password } = req.body;
    
    try {
        const result = await User.create({
            email,
            password: await bcrypt.hash(password, 10),
        });
        res.status(201).json({
            user: {
                email: result.email,
                subscription: result.subscription,
            },
        });
    } catch (e) {
        if (e.code === 11000) {
            e.status = 409;
            e.message = "Email in use";
        }
        next(e);
    }
};

module.exports = register;