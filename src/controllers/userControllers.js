// const bcrypt = require("bcryptjs");
const { registration, login, logout, getCurrentUser } = require("../services/authService");

const registrationController = async(req, res) => {
    const { email, password } = req.body;
    const user = await registration(email, password);
    res.status(201)
    .json({ user: { email: `${user.email}`, subscription: `${user.subscription}` } });
}

const loginController = async (req, res) => {
    const { email, password } = reg.body;
    const token = await login(email, password);
    res.status(200).json({ token, user: { email: `${email}` }})
};

const logoutController = async (req, res) => {
    const { id } = req.user;
    await logout(id);
    res.status(204).json({ status: "success", message: "No connect" });
};
const getCurrentUserController = async (req, res) => {
        const { id } = req.user;
        const user = await getCurrentUser(id);
        res.status(200).json({ email: `${user.email}`, subscription: `${user.subscription}` });
    };

module.exports = {
    registrationController,
    loginController,
    logoutController,
    getCurrentUserController,
}
