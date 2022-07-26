"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateContactList = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const __1 = __importDefault(require("../.."));
const updateContactList = async (contacts) => {
    await promises_1.default.writeFile(__1.default.contactsPath, JSON.stringify(contacts, null, 2));
};
exports.updateContactList = updateContactList;
