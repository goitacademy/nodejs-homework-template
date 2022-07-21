"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contactsActions_1 = __importDefault(require("./contactsActions"));
const contactsDB_1 = __importDefault(require("./contactsDB"));
const contactsDBModel = {
    contactsActions: contactsActions_1.default,
    contactsPath: contactsDB_1.default,
};
exports.default = contactsDBModel;
