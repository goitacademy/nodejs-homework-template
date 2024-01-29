const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { HttpError, ctrlWrapper } = require("../helpers");
const { User } = require("../models/user");


const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        throw HttpError(409, "Email is already in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ ...req.body, password: hashPassword });

    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: "starter",
        },
    })
};

const login = async (req, res) => { 
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });

    if (!user) {
        throw HttpError(401, "Email or password wrong");
    };

    const passwordCompare = await bcrypt.compare(password, user.password);
    
    if (!passwordCompare) {
        throw HttpError(401, "Email or password wrong");
    };

    const payload = {
        id: user._id,
    }

    const { SECRET_KEY } = process.env;

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, { token });
    
    res.status(201).json({
        token,
         user: {
    email: user.email,
    subscription: user.subscription,
  }
    });
}

const getCurrent = async (req, res) => { 
    const { email, subscription } = req.user;
    res.json(
        {email,
        subscription}
    )
}

const logout = async (req, res) => {
    const { _id } = req.user;
    const user = await User.findByIdAndUpdate(_id, { token: "" });
    console.log(user);
  
    res.status(204).end()
}

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout)
}