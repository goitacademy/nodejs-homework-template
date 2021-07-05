import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../db/userModel.js';
import {
    RegistrationConflictError,
    NotAuthorizedError,
} from '../helpers/error.js';

const register = async (email, password) => {
    const emailConflict = await User.findOne({ email }, { email: 1, _id: 0 });
    if (emailConflict) {
        throw new RegistrationConflictError('E-mail in use');
    }
    const newUser = new User({
        email,
        password,
    });
    await newUser.save();
    return {
        user: { email: newUser.email, subscription: newUser.subscription },
    };
};

const login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new NotAuthorizedError('Wrong email or password');
    }
    if (!(await bcrypt.compare(password, user.password))) {
        throw new NotAuthorizedError('Wrong email or password');
    }
    const token = await jwt.sign(
        { _id: user._id, email: user.email },
        process.env.SALT,
    );
    return {
        token,
        user: { email: user.email, subscription: user.subscription },
    };
};

export { register, login };
