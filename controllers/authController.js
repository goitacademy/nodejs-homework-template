const { registration, login, logout, current, changeSubscription } = require("../services/authService");

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

const logoutController = async (req, res) => { 
    const { _id } = req.user;
    await logout(_id)
    // await User.findByIdAndUpdate(_id, { token: null });    
    res.status(204).json()
}

const currentUserController = async (req, res) => {
    // console.log("currentUserController");
    const { _id } = req.user;
    const user = await current(_id);
    const {email, subscription} = user
    res.json({ email, subscription  })
}
 
const changeSubscriptionController = async (req, res) => {
    console.log("In changeSuscriptionController")
    const { _id } = req.user;
    const { subscription } = req.body
    const user = await changeSubscription(_id, subscription)
    res.json({ email: user.email, subscription: user.subscription  })
}

module.exports = {
    registrationController,
    loginController,
    logoutController,
    currentUserController,
    changeSubscriptionController
}