"use strict";
const __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Contact_1 = __importDefault(require("./Contact"));
const outerSchema_1 = __importDefault(require("./outerSchema"));
const Contact = {
    model: Contact_1.default,
    outerSchema: outerSchema_1.default
};
exports.default = Contact;
