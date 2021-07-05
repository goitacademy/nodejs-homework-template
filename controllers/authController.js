import { register, login } from '../services/authService.js';

const registerController = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await register(email, password);
    res.status(201).json({ message: user });
};

const loginController = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await login(email, password);
    res.status(200).json({ message: 'Successfully logged in', ...user });
};

export { registerController, loginController };
