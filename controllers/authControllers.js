const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const User = require("../models/user");


async function register(req, res, next) {
  const { email, password } = req.body;
  // Joi
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const validation = schema.validate({ email, password });

  if (validation.error) {
    return res.status(400).json({ message: validation.error.details[0].message });
  }
  try {
    const user = await User.findOne({ email: email}).exec();
    if(user!==null) {
        return res.status(409).send({message: "Email in use"});
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: passwordHash, subscription: 'starter' });

    res.status(201).json({
        message: "Registration successful",
        user: {
            email: newUser.email, 
            subscription: newUser.subscription
        }     
    });
     
  } catch (err) {
    console.error(err);
    next(err);
  }
}

async function login(req, res, next) {
    const {email, password} = req.body;

     // Joi
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const validation = schema.validate({ email, password });

  if (validation.error) {
    return res.status(400).json({ message: "Wrong request" });
  }

    try {
        const user = await User.findOne({email}).exec();
        if (user===null) {
            // console.log("EMAIL")
           return res
            .status(401)
            .send({ message: "Email or password is wrong" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch===false) {
            // console.log("Password")
           return res
            .status(401)
            .send({ message: "Email or password is wrong" });
        }

        const token = jwt.sign({id: user._id }, process.env.JWT_SECRET, {expiresIn: "1d"});
        await User.findByIdAndUpdate(user._id, {token}).exec();
        
        console.log({token});
        res.status(200).json({
            token: token,
            user: {
                email: user.email, 
                subscription: user.subscription
            }     
        });

    } catch (error) {
        next(error);
    }
    
}

async function logout(req, res, next) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Not authorized" });
      }
  
      await User.findByIdAndUpdate(req.user.id, { token: null });
  
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  }

async function getCurrent(req, res, next) {
    try {
      if (!req.user) {
        return res.status(401).send('Not authorized');
      }
  
      res.status(200).json({
        email: req.user.email,
        subscription: req.user.subscription,
      });
  
    } catch (err) {
      next(err);
    }
  };

module.exports = { register, login, logout, getCurrent };
