"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createError_1 = __importDefault(require("../../helpers/createError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_1 = __importDefault(require("../../models/users"));
const auth = async (req, res, next) => {
    try {
        const { SECRET_KEY } = process.env;
        if (!SECRET_KEY) {
            throw (0, createError_1.default)({ status: 500 });
        }
        const { authorization } = req.headers;
        if (!authorization) {
            throw (0, createError_1.default)({ status: 401 });
        }
        const [bearer, token] = authorization.split(' ');
        if (bearer !== 'Bearer' || !token) {
            throw (0, createError_1.default)({ status: 401 });
        }
        const { id } = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        if (!id) {
            throw (0, createError_1.default)({ status: 401 });
        }
        const user = await users_1.default.model.findById(id);
        if (!user || !user.token) {
            throw (0, createError_1.default)({ status: 401 });
        }
        req.user = user;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.default = auth;
