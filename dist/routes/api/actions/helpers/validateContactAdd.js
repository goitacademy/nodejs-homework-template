"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateContactAdd = void 0;
const contactIterfaces_1 = require("../../../../Interfaces/contactIterfaces");
const validateContactAdd = (contact) => {
    return contactIterfaces_1.contactAddShema.validate(contact);
};
exports.validateContactAdd = validateContactAdd;
