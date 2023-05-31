const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../models/user');

const { HttpError, ctrlWrapper } = require('../helpers');
const { SECRET_KEY } = process.env;

const register = async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email});

    if (user) {
        throw HttpError(409, 'Email in use')
    };

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({...req.body, password: hashPassword});

    res.status(201).json({
        "user": 
        {email: newUser.email,
        subscription: 'starter'}
    })
};

const login = async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if (!user) {
        throw HttpError(401, 'Email or password is wrong')
    };
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401, 'Email or password is wrong')
    };

    const payload = {
        id: user._id
    }
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '23h'});
    await User.findByIdAndUpdate(user._id, {token});
    
    res.json({
        token,
        user: {
            email: user.email,
            subscription: 'starter'
        } 
    });
};

const getCurrent = async (req, res) => {
    const { email, subscription } = req.user;

    res.json({
        email,
        subscription
    })
};

const logout = async (req, res) => {
    const {_id} = req.user;
    await User.findByIdAndUpdate( _id, {token: ""});

    res.json(
        "status: 204, No content"
    )
};

const updateSubscriptionUser = async (req, res) => {
    const {id} = req.user;
    console.log(id)
    console.log(req.body)
    const result = await User.findByIdAndUpdate(id, req.body, {new: true});
    res.json(result);
};

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateSubscriptionUser: ctrlWrapper(updateSubscriptionUser)
}