"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createError_1 = __importDefault(require("../../helpers/createError"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_1 = __importDefault(require("../../models/users"));
const signup = async (req, res) => {
    //to check: Is request body exist?    
    if (!req.body) {
        throw (0, createError_1.default)({ status: 400 });
    }
    //tp check: Does the body's data match the schema?
    const { error } = users_1.default.outerSchema.validateUser(req.body);
    if (error) {
        throw (0, createError_1.default)({
            status: 400,
            messageProd: error.message,
        });
    }
    //to check: Is the user with the email exist in data base? 
    const { email, password, subscription = 'starter' } = req.body;
    const user = await users_1.default.model.findOne({ email });
    if (user) {
        throw (0, createError_1.default)({
            status: 409,
            messageProd: `Email in use`,
        });
    }
    //to hash password
    const salt = 10;
    const hashPassword = await bcrypt_1.default.hash(password, salt);
    //to add user's data to data base
    const result = await users_1.default.model.create({ email, password: hashPassword, subscription });
    if (!result) {
        throw (0, createError_1.default)({
            status: 500
        });
    }
    //to create response
    res.status(201).json({
        user: {
            email,
            subscription,
        }
    });
};
exports.default = signup;
