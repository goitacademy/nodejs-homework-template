const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");

const { HttpError, ctrlWrapper } = require("../helpers");

const { SECRET_KEY } = process.env;

const User = require("../models/user");

const checkRegister = Joi.object({

    email: Joi.string().pattern(/\w{0}[a-zA-Zа-яА-Я]+\@\w{0}[a-zA-Zа-яА-Я]+\.\w{0}[a-zA-Zа-яА-Я]/).required(),
    password: Joi.string().min(8).required(),
    subscription: Joi.string().valid("starter", "pro", "business"),

});

const checkShemaSubscription = Joi.object({
    subscription: Joi.boolean().valid("starter", "pro", "business").required(),
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

    if(user) throw HttpError(409, "Email in use");

    // ather error message
    if (error) {
    throw HttpError(
        400,
        'Joi validation error'
        );
    }

    // get url for temp user avatar
    const avatarURL = gravatar.url(email);

    // hash password
    const hashPassword = await bcrypt.hash(password, 10);
  
    const newUser = await User.create({...body, password: hashPassword, avatarURL});

    res.status(201).json({
        user:{
            email: newUser.email,
            subscription: newUser.subscription
        }
    });
   
};

const login = async (req, res) => {

    const { body } = req;
    const { email, password } = req.body;
    const { error } = checkLogin.validate(body);

    // ather error message (from frontend)
    if (error) {
        throw HttpError(
            400,
            'Joi validation error'
        );
    }
    // check email that user with sach email use (on DB resource)
    const user = await User.findOne({email});

    if(!user) throw HttpError(401, "Email or password wrong");

    // check email that enter password invalid
    const passwordCompare = await bcrypt.compare(password, user.password);

    if(!passwordCompare) throw HttpError(401, "Email or password wrong");

    // create token
    const payload = {
        id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '23h'});

    await User.findByIdAndUpdate(user._id,{token});

    res.status(200).json({
        token,
    });
};


const getCurrent = (req, res) => {

    const { email, subscription } = req.user;
  
    res.status(200).json({
        email: email,
        subscription: subscription,
    });
  
};

const logout = async(req, res) => {

    const { _id } = req.user;
    
    await User.findByIdAndUpdate(_id, {token: ""});
  
    res.status(204).json({
        message: "No Content",
    });
  
};

const updateSubscriptionUser = async (req, res) => {
   
    const { _id } = req.user;
    const { body } = req;
    const { error } = checkShemaSubscription.validate(body);
    

    if (error) {
      throw HttpError(
        400,
        `missing ${error.message
          .split(" ")
          .filter(
            (value) =>
              value !== "is" && value !== "required" && value !== "field"
          )} field`
      );
    }
  
    // Replace the value of the "favorite" ($set operator) field or add it if it does not exist
    const result = await User.updateOne({_id: _id},{$set:{subscription: body.subscription}});
  
    if (result === null) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(await User.findById(_id));
  
}

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    logout: ctrlWrapper(logout),
    getCurrent: ctrlWrapper(getCurrent),
    updateSubscriptionUser: ctrlWrapper(updateSubscriptionUser),
};