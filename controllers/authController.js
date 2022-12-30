const { registration, login } = require("../services/authService.js")


const registrationController = async (req, res) => {
    const { email, password } = req.body;
    await registration(email, password);

    // res.json({ status: "success" });
    res.status(200).json({
        status: "success",
        code: 200,
        user: {
            email,
            subscription: "starter"
        }
    });
};


const loginController = async (req, res) => {
    const { email, password } = req.body;
    const token = await login(email, password);

    res.json({ status: "success", token });
};


module.exports = {
    registrationController,
    loginController
}