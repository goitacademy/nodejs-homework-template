import {
    register,
    login,
    logout,
    currentUser,
    changeAvatar,
} from '../services/authService.js';
import { WrongParametersError } from '../helpers/error.js';

const registerController = async (req, res) => {
    const { email, password } = req.body;
    const user = await register(email, password);
    res.status(201).json({ message: 'Successfully registred', ...user });
};

const loginController = async (req, res) => {
    const { email, password } = req.body;
    const user = await login(email, password);
    res.status(200).json({ message: 'Successfully logged in', ...user });
};

const logoutController = async (req, res) => {
    const userId = req.user._id;
    const token = req.token;
    await logout(userId, token);
    res.status(200).json({ message: 'Successfully logged out' });
};

const currentUserController = async (req, res) => {
    const user = await currentUser(req.user._id);
    res.status(200).json(user);
};

const changeAvatarController = async (req, res) => {
    if (!req.file) {
        throw new WrongParametersError('Please, choose a file first!');
    }
    const avatarURL = await changeAvatar(req.user._id, req.token, req.file);
    res.status(200).json({ message: avatarURL });
};

export {
    registerController,
    loginController,
    logoutController,
    currentUserController,
    changeAvatarController,
};
