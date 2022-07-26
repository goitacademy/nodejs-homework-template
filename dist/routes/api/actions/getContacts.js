'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contacts_1 = __importDefault(require("../../../models/contacts"));
const createError_1 = require("../../../helpers/createError");
const getContacts = async (req, res) => {
    const result = await contacts_1.default.contactsActions.listContacts();
    if (!result) {
        throw (0, createError_1.createError)("404");
    }
    res.json(result);
};
exports.default = getContacts;
