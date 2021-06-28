import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../db/userModel.js';

const register = async (email, password) => {
    const newUser = new User({
        email,
        password,
    });
    await newUser.save();
    return newUser;
};

const login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        return `No user with email ${email} found`;
    }
    if (!(await bcrypt.compare(password, user.password))) {
        return `Password incorrect, try again`;
    }
    const token = await jwt.sign(
        { _id: user._id, email: user.email },
        process.env.SALT,
    );
    return token;
};

export { register, login };
