const {registration, login} = require("../services/authService");

const registrationController = async (req, res) => {
    const {email, password} = req.body;
    const user = await registration(email, password);
    res.status(201).json({
        user: {
            email: user.email,
            subscription: user.subscription
        }
    })
}
const loginController = async (req, res) => {
    const {email, password} = req.body;
    const { token, user } = await login(email, password);
    res.json({ token, user: {
            email: user.email,
            subscription: user.subscription
        }  })
}

const logoutController = async (req, res) => { }
const currentUserController = async (req, res) => {
    // console.log("currentUserController");
    const {email, subscription} = req.user
    res.json({ email, subscription    })
 }

module.exports = {
    registrationController,
    loginController,
    logoutController,
    currentUserController
}