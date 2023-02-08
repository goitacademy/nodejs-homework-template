const {
    signup, 
    login,
    logout,
    updateSubscription,
    // updateAvatar,
} = require('../services/authService')

const ctrlSignup = async (req, res) => { 
    const { email, password, subscription, avatarURL } = req.body;
    
    const user = await signup(email, password, subscription, avatarURL);

    res.status(201).json({user});
};

const ctrlLogin = async (req, res) => { 
    const { email, password, subscription } = req.body;

    const data = await login(email, password, subscription);

    res.status(201).json({data});
};

const ctrlLogout = async (req, res) => { 
    const { _id } = req.user;

    await logout(_id);

    res.status(204).json();
};

const ctrlCurrent = async (req, res) => { 
    const user = req.user;

    res.status(200).json({user});
};

const ctrlChangeSubscription = async (req, res) => { 
    const { _id } = req.user;
    const { subscription } = req.body;

    const user = await updateSubscription(_id, subscription);

    res.status(200).json({user});
};

const ctrlChangeAvatar = async (req, res) => { 
    // const { _id } = req.user;
    // const { avatarURL } = req.body;

    // const user = await updateAvatar(_id, avatarURL);

    res.status(200).json({status:'success'});
};

module.exports = {
    ctrlSignup,
    ctrlLogin,
    ctrlLogout,
    ctrlCurrent,
    ctrlChangeSubscription,
    ctrlChangeAvatar,
}