"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const verifyAction = async (req, res, next, callback) => {
    try {
        await callback(req, res);
    }
    catch (error) {
        next(error);
    }
};
exports.default = verifyAction;
