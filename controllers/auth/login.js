const { User } = require("../../models/");
const {Unauthorized} = require("http-errors");
const jwt = require("jsonwebtoken");
const path = require("path");
const envPath = path.join(__dirname, "../../.env");
require("dotenv").config({ path: envPath });

const {SECRET_KEY} = process.env;

async function login(req, res) {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    const subscription = user.subscription;
    if (!user || !user.checkPassword(password)) {
        throw new Unauthorized(`Email or password is wrong`);
    }
    const payload = {
        id: user._id
    };
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "2h"});
    await User.findByIdAndUpdate(user._id, {token});
    res.json({
        status: "success",
        code: "200",
        data: {
            token,
            user: {
                email,
                subscription
            }
        }
    });
}

module.exports = login;