const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');

const User = require("../models/user");


async function register(req, res, next) {
  const { email, password, subscription } = req.body;
  try {
    const user = await User.findOne({ email: email}).exec();
    if(user!==null) {
        return res.status(409).send({message: "User already registered"});
    }
    const passwordHash = await bcrypt.hash(password, 10);
    await User.create({ email, password: passwordHash, subscription });

    res.status(201).send({ message: "Registration successful" });
     
  } catch (err) {
    console.error(err);
    next(err);
  }
}

async function login(req, res, next) {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email}).exec();
        if (user===null) {
            console.log("EMAIL")
           return res
            .status(401)
            .send({ message: "Email or password incorrect" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch===false) {
            console.log("Password")
           return res
            .status(401)
            .send({ message: "Email or password incorrect" });
        }

        const token = jwt.sign({id: user._id }, process.env.JWT_SECRET, {expiresIn: "1d"});
        await User.findByIdAndUpdate(user._id, {token}).exec();
        
        console.log({token});
        res.send({token});

    } catch (error) {
        next(error);
    }
    
}

async function logout(req, res, next) {
    try {
        await User.findByIdAndUpdate(req.user.id, {token: null});
        
        res.status(204).end();
    } catch (err) {
        next(err);
    }
}

module.exports = { register, login, logout };
