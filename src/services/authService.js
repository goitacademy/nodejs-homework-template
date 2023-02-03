const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../db/userModel');
const { RegistrationConflictError, NotAuthorizedError } = require('../helpers/errors');

const signup = async (email, password, subscription) => {
    const user = await User.findOne({ email });
    
    if (email === user.email) {
        throw new RegistrationConflictError("Email in use");
    };

    const newUser = new User({
        email,
        password,
        subscription,
    })
    await newUser.save();
    return newUser;
};

const login = async (email, password, subscription) => {
    const user = await User.findOne({ email });

    if (!user || !await bcrypt.compare(password, user.password)) {
        throw new NotAuthorizedError("Email or password is wrong");
    }

    const payload = {
        _id: user._id,
        email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
     
    const data = { token: token, user: user };
    return data;
};

const logout = async () => {
    
};

const current = async () => {
    
};


module.exports = {
    signup,
    login,
    logout,
    current,
};