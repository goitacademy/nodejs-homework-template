const {
    signup, 
    login,
} = require('../services/authService')

const ctrlSignup = async (req, res) => { 
    const { email, password, subscription } = req.body;

    const user = await signup(email, password, subscription);

    res.status(201).json({user});
};

const ctrlLogin = async (req, res) => { 
    const { email, password, subscription } = req.body;

    const data = await login(email, password, subscription);

    res.status(201).json({data});
};

const ctrlLogout = async (req, res) => { 
    // const { email, password, subscription } = req.body;

    // const data = await login(email, password, subscription);

    // res.status(201).json({data});
};

const ctrlCurrent = async (req, res) => { 
    // const { email, password, subscription } = req.body;

    // const data = await login(email, password, subscription);

    // res.status(201).json({data});
};

module.exports = {
    ctrlSignup,
    ctrlLogin,
    ctrlLogout,
    ctrlCurrent
}