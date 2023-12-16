const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");

const { HttpError, ctrlWrapper } = require("../helpers");

const { SECRET_KEY } = process.env;

const User = require("../models/user");

const checkRegister = Joi.object({

    name: Joi.string().required(),
    email: Joi.string().pattern(/\w{0}[a-zA-Zа-яА-Я]+\@\w{0}[a-zA-Zа-яА-Я]+\.\w{0}[a-zA-Zа-яА-Я]/).required(),
    password: Joi.string().min(8).required(),

});

const checkLogin = Joi.object({

    email: Joi.string().pattern(/\w{0}[a-zA-Zа-яА-Я]+\@\w{0}[a-zA-Zа-яА-Я]+\.\w{0}[a-zA-Zа-яА-Я]/).required(),
    password: Joi.string().min(8).required(),

});

const register = async (req, res) => {
    
    const { body } = req;
    const { email, password } = req.body;
    const { error } = checkRegister.validate(body);

    // for create unique 409 message
    const user = await User.findOne({email});

    if(user) throw HttpError(409, "User already in use");

    // ather error message
    if (error) {
    throw HttpError(
        400,
        `missing required ${error.message
        .split(" ")
        .filter(
            (value) =>
                value !== "is" && value !== "required" && value !== "field"
            )} field`
        );
    }

    // hash password
    const hashPassword = await bcrypt.hash(password, 10);
  
    const newUser = await User.create({...body, password: hashPassword});

    res.status(201).json({
        email: newUser.email,
        name: newUser.name,
    });
   
};

const login = async (req, res) => {

    const { body } = req;
    const { email, password } = req.body;
    const { error } = checkLogin.validate(body);

    // ather error message (from frontend)
    if (error) {
        throw HttpError(
            401,
            `missing required ${error.message
            .split(" ")
            .filter(
                (value) =>
                    value !== "is" && value !== "required" && value !== "field"
                )} field`
        );
    }
    // check email that user with sach email use (on DB resource)
    const user = await User.findOne({email});

    if(!user) throw HttpError(401, "Email or password invalid");

    // check email that enter password invalid
    const passwordCompare = await bcrypt.compare(password, user.password);

    if(!passwordCompare) throw HttpError(401, "Email or password invalid");

    // create token
    const payload = {
        id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '23h'});

    res.status(200).json({
        token,
    });
};

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
};