import { register, login } from '../services/authService.js';

const registerController = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        await register(email, password);
        res.status(200).json({ message: 'Successfully registred' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const loginController = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const token = await login(email, password);
        res.status(200).json({ message: 'Successfully logged in', token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export { registerController, loginController };
