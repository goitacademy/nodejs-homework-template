"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactAddShema = void 0;
const types_joi_1 = __importDefault(require("types-joi"));
exports.contactAddShema = types_joi_1.default.object({
    name: types_joi_1.default.string().required(),
    /*     a valid email address string
        must have two domain parts e.g. example.com
        TLD must be .com or .net
     */
    email: types_joi_1.default.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
    phone: types_joi_1.default.string().required(),
});
