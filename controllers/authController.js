const { User } = require('../models/userModel')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { SECRET_KEY } = process.env;
require("dotenv").config();

    const signup = async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            res.status(409).json({
                status: "error",
                code: 409,
                message: `Email '${email}' in use`,
            });
        }

        const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        const result = await User.create({ email, password: hashPassword });
        console.log(SECRET_KEY)
        res.status(201).json({
            status: "success",
            code: 201,
            
            user: {
                email: result.email,
                
            },
        });
}

const login = async (req, res) => {
        require("dotenv").config();
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !user.comparePassword(password)) {
            res.status(401).json({
                status: "error",
                code: 401,
                message: "Email or password is wrong",
            });
        }

        const payload = {
            id: user._id,
        };

        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
        await User.findByIdAndUpdate(user._id, { token });

        res.json({
            status: "succes",
            code: 200,
            data: {
                token,
                user: {
                    email: user.email,
                    subscription: user.subscription,
                },
            },
        });
    };
    const logout = async (req, res) => {
        const { _id } = req.user;
        await User.findByIdAndUpdate(_id, { token: null });

        if (!_id) {
            res.status(401).json({
            status: "error",
            code: 401,
            message: "Not authorized",
            });
  }

  res.status(204).json();
};


module.exports = {
    signup, login, logout
}