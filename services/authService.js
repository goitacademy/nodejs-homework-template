import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fs from 'fs/promises';
import path from 'path';
import jimp from 'jimp';
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

    await User.findOneAndUpdate({ email }, { $set: { token } });

    return {
        token,
        user: { email: user.email, subscription: user.subscription },
    };
};

const logout = async (userId, token) => {
    await User.findByIdAndUpdate(
        { _id: userId, token },
        { $set: { token: null } },
    );
};

const currentUser = async userId => {
    return await User.findOne(
        { _id: userId },
        { subscription: 1, email: 1, _id: 0 },
    );
};

const changeAvatar = async (userId, token, avatarImg) => {
    const AVATARS_PATH = path.resolve('public/avatars');
    const img = await jimp.read(avatarImg.path);
    await img
        .autocrop()
        .cover(
            250,
            250,
            jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE,
        )
        .writeAsync(avatarImg.path);
    await fs.rename(
        avatarImg.path,
        path.join(AVATARS_PATH, avatarImg.filename),
    );
    await User.findOneAndUpdate(
        {
            _id: userId,
            token,
        },
        {
            $set: {
                avatarURL: `http://localhost:3001/public/avatars/${avatarImg.filename}`,
            },
        },
    );
    return `http://localhost:3001/public/avatars/${avatarImg.filename}`;
};

export { register, login, logout, currentUser, changeAvatar };
