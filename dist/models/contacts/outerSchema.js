"use strict";
const __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const validateAdd = (contact) => {
    const contactAddSchema = joi_1.default.object({
        name: joi_1.default.string().required(),
        email: joi_1.default.string(),
        phone: joi_1.default.string(),
        favorite: joi_1.default.boolean().default(false)
    });
    return contactAddSchema.validate(contact);
};
const validatePatchEmail = (email) => {
    const contactPatchEmailSchema = joi_1.default.object({
        email: joi_1.default.string().required(),
    });
    return contactPatchEmailSchema.validate(email);
};
const validatePatchPhone = (phone) => {
    const contactPatchPhoneSchema = joi_1.default.object({
        phone: joi_1.default.string().required(),
    });
    return contactPatchPhoneSchema.validate(phone);
};
const validatePatchFavorite = (favorite) => {
    const contactPatchFavoriteSchema = joi_1.default.object({
        favorite: joi_1.default.boolean().required().messages({ "any.required": "missing field favorite" }),
    });
    return contactPatchFavoriteSchema.validate(favorite);
};
const validatePatchName = (name) => {
    const contactPatchNameSchema = joi_1.default.object({
        name: joi_1.default.string().required(),
    });
    return contactPatchNameSchema.validate(name);
};
const outerSchema = {
    validateAdd,
    validatePatchEmail,
    validatePatchFavorite,
    validatePatchName,
    validatePatchPhone
};
exports.default = outerSchema;
