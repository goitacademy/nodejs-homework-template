"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const createError_1 = __importDefault(require("../../helpers/createError"));
const users_1 = __importDefault(require("../../models/users"));
const login = async (req, res) => {
    const { NODE_ENV } = process.env;
    //to check:  Does request contain a password and an email?
    const { password = null, email = null } = req.body;
    if (!password || !email) {
        throw (0, createError_1.default)({ status: 400, messageProd: "Email or password is missed" });
    }
    //to check: Does the password and the email match the schema?
    const { error } = users_1.default.outerSchema.validateUser({ password, email });
    if (error) {
        throw (0, createError_1.default)({ status: 400, messageProd: error.message });
    }
    //to check: Does the email present in the data base?
    const user = await users_1.default.model.findOne({ email });
    if (!user) {
        throw (0, createError_1.default)({
            status: 401,
            messageProd: "Email or password is wrong",
            messageDev: "Dev:Email is not exist in data base",
            nodeEnv: NODE_ENV
        });
    }
    //to check: Is the password valid?
    const comparePassword = await bcrypt_1.default.compare(password, user.password);
    if (!comparePassword) {
        throw (0, createError_1.default)({
            status: 401,
            messageProd: "Email or password is wrong",
            messageDev: "Dev: Invalid password",
            nodeEnv: NODE_ENV
        });
    }
    //token operations
    //to check: Does the SECRET_KEY exist? 
    const { SECRET_KEY } = process.env;
    if (!SECRET_KEY) {
        throw (0, createError_1.default)({
            status: 500,
            messageDev: "SECRET_KEY is not available",
            nodeEnv: NODE_ENV,
        });
    }
    //to create token
    const payload = {
        id: user._id,
    };
    let token = '';
    try {
        token = jsonwebtoken_1.default.sign(payload, SECRET_KEY, { expiresIn: '24h' });
    }
    catch (error) {
        throw (0, createError_1.default)({
            status: 500,
            messageDev: "Procedure of token creating is broken",
            nodeEnv: NODE_ENV,
        });
    }
    //to update user's data
    await users_1.default.model.findByIdAndUpdate(user._id, { token });
    //to create response
    res.json({
        token,
        user: {
            email: user.email,
            subscription: user.subscription,
        }
    });
};
exports.default = login;
