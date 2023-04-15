const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const { User } = require('./userSchema');
const { RegistrationConflictError, NotAuthorizedError } = require("../../helpers/index");

const registration = async (email, password) => {
    const user = await User.findOne({ email });
    
    if (user) {
        throw new RegistrationConflictError(`Email '${email}' is already in use`);
    }
    
    const createdUser = new User({
        email,
        password: await bcrypt.hash(password, 10)
    });
    await createdUser.save();

    return createdUser;

}

const login = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new NotAuthorizedError("Email or password is wrong");
    }

    if (! await bcrypt.compare(password, user.password)) {
        throw new NotAuthorizedError("Email or password is wrong");
    }

    const token= jwt.sign({
        _id: user._id,
        createdAt: user.createdAt
    }, process.env.JWT_SECRET);

    const userData = { token, user };

    return userData;
}



module.exports = {
    registration,
    login
 
}