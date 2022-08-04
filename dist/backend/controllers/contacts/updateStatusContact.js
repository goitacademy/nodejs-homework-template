"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createError_1 = __importDefault(require("../../helpers/createError"));
const contacts_1 = __importDefault(require("../../models/contacts"));
const updateStatusContact = async (req, res) => {
    const { body } = req;
    const { error } = contacts_1.default.outerSchema.validatePatchFavorite(body);
    if (error) {
        throw (0, createError_1.default)({
            status: 400,
            messageProd: error.message
        });
    }
    const { contactId } = req.params;
    console.log("before  update servise");
    const result = await contacts_1.default.model.findByIdAndUpdate(contactId, body, { new: true });
    if (!result) {
        throw (0, createError_1.default)({
            status: 404
        });
    }
    res.json(result);
};
exports.default = updateStatusContact;
