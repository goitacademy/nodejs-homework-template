import { register, login, currentUser } from '../services/authService.js';

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

const currentUserController = async (req, res) => {
    const user = await currentUser(req.user._id);
    res.status(200).json(user);
};

export { registerController, loginController, currentUserController };
