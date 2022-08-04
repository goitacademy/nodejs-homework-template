"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const contactPatchEmailSchema = joi_1.default.object({
    email: joi_1.default.string(),
});
const validatePatchEmail = (email) => {
    return contactPatchEmailSchema.validate(email);
};
const contactPatchPhoneSchema = joi_1.default.object({
    phone: joi_1.default.string(),
});
const validatePatchPhone = (phone) => {
    return contactPatchPhoneSchema.validate(phone);
};
const contactPatchFavoriteSchema = joi_1.default.object({
    favorite: joi_1.default.boolean().messages({ "any.required": "missing field favorite" }),
});
const validatePatchFavorite = (favorite) => {
    return contactPatchFavoriteSchema.validate(favorite);
};
const contactPatchNameSchema = joi_1.default.object({
    name: joi_1.default.string(),
});
const validatePatchName = (name) => {
    return contactPatchNameSchema.validate(name);
};
const contactPatchOwnerSchema = joi_1.default.object({
    owner: joi_1.default.any()
});
const contactAddSchema = joi_1.default.object()
    .concat(contactPatchNameSchema.required())
    .concat(contactPatchEmailSchema)
    .concat(contactPatchPhoneSchema)
    .concat(contactPatchFavoriteSchema)
    .concat(contactPatchOwnerSchema);
const validateContactAdd = (contact) => {
    return contactAddSchema.validate(contact);
};
const outerSchema = {
    validateContactAdd,
    validatePatchEmail,
    validatePatchFavorite,
    validatePatchName,
    validatePatchPhone
};
exports.default = outerSchema;
