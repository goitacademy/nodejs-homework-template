"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createError_1 = __importDefault(require("../../helpers/createError"));
const contacts_1 = __importDefault(require("../../models/contacts"));
const add = async (req, res) => {
    const { body } = req;
    const { error } = contacts_1.default.outerSchema.validateContactAdd(body);
    if (error) {
        throw (0, createError_1.default)({
            status: 400,
        });
    }
    const result = await contacts_1.default.model.create(body);
    res.status(201).json(result);
};
exports.default = add;
