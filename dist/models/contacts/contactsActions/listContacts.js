"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listContacts = void 0;
const promises_1 = require("fs/promises");
const __1 = __importDefault(require("../"));
const listContacts = async () => {
    const data = await (0, promises_1.readFile)(__1.default.contactsPath, 'utf-8');
    if (!data) {
        return null;
    }
    const result = JSON.parse(data);
    return result;
};
exports.listContacts = listContacts;
