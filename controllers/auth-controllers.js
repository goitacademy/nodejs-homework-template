const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const { User}  = require('../models/user');

const { HttpError, controllerWrapper } = require('../helpers');

const { SECRET_KEY } = process.env;

// singup
const register = async (req, res) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) { 
        throw HttpError(409, "Email already exist");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const result = await User.create({...req.body, password: hashPassword})
    res.status(201).json({
        name: result.name,
        email: result.email,
    })
};

// signin
const login = async (req, res) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) { 
        throw new HttpError(401);
    };
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw new HttpError(401)
    };
    const { _id: id } = user;

    const payload = {
        id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(id, {token});
    
    res.json({
        token,
        user: {
            name: user.name,
            email: user.email,
        }
    });
};

// current
const getCurrent = async (req, res) => {

    const { name, email } = req.user;
    res.json({
        user: {
            name,
            email
        }
    })
};

// logout
const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });
    res.json({
        message:"Logout success"
    })
};

// updateSubscription
const updateSubscription = async (req, res) => {
    const result = await User.findByIdAndUpdate(req.user._id, req.body, { new: true })
res.json(result);
//   const { id } = req.params;
//   const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
//   if (!result) {
//     throw HttpError(404, `Contact with id=${id} not found`);
//   }
//   res.json(result);
};

module.exports = {
    register: controllerWrapper(register),
    login: controllerWrapper(login),
    getCurrent: controllerWrapper(getCurrent),
    logout: controllerWrapper(logout),
    updateSubscription: controllerWrapper(updateSubscription),
};