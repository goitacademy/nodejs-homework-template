const {
    signup, 
    verifyEmail,
    login,
    logout,
    updateSubscription,
    updateAvatar,
} = require('../services/authService')

const ctrlSignup = async (req, res) => { 
    const { email, password, subscription, avatarURL } = req.body;
    
    const user = await signup(email, password, subscription, avatarURL);

    res.status(201).json({user});
};

const ctrlVerification  = async (req, res) => { 
    const { verificationToken } = req.params;
    
    await verifyEmail(verificationToken);

    res.status(200).json({ message: 'Verification successful' });
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
    const { _id } = req.user;
    const { path: temporaryName, originalname } = req.file;
    
    const avatarURL = await updateAvatar(_id, temporaryName, originalname);

    res.status(200).json({avatarURL});
};

module.exports = {
    ctrlSignup,
    ctrlVerification,
    ctrlLogin,
    ctrlLogout,
    ctrlCurrent,
    ctrlChangeSubscription,
    ctrlChangeAvatar,
}