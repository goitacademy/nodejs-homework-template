"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ctrlTryCatchWrapper = (controller) => {
    const func = async (req, res, next) => {
        try {
            await controller(req, res);
        }
        catch (error) {
            next(error);
        }
    };
    return func;
};
exports.default = ctrlTryCatchWrapper;
