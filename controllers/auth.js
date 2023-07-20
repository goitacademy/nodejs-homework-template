const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {User} = require("../models/user");
const {HttpError, ctrlWrapper} = require("../helpers");
const {SECRET_KEY} = require("../config")

const register = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(user){
        throw new HttpError(409,"Email already in use")
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({...req.body, password: hashPassword})

    res.status(201).json({
        email: newUser.email,
        name: newUser.name,
    })
};

const login = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email})
    if(!user) {
        throw new HttpError(401, "Email or password invalid")
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
        throw new HttpError(401, "Email or password invalid")
    }

    const payload = {
        id: user._id
    };

    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"})
    await User.findByIdAndUpdate(user._id, {token})
    res.json({ 
        token,
    })
}

const getCurrent = async(req, res) => {
    const {email,name} = req.user;
    res.json({
        email,
        name,
    })
}

const logout = async(req, res) => {
    const {_id} = req.user;
    await User.findByIdAndUpdate(_id, {token: ""})

    res.json({
        message: "Logout success"
    })
}

const updateSubscription = async(req, res) => {
    const {_id} = req.user;
      const newSubscription = req.body.subscription;
        try {
        const result = await User.findByIdAndUpdate(_id, { subscription: newSubscription }, { new: true });
    
        if (!result) {
          throw new HttpError(404, "Not found");
        }
    
        return res.json(result);
      } catch (error) {
        return res.status(error.statusCode || 500).json({ error: error.message });
      }
}

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateSubscription: ctrlWrapper(updateSubscription)
}