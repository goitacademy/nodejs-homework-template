'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getContacts_1 = __importDefault(require("./getContacts"));
const getContactById_1 = __importDefault(require("./getContactById"));
const postContact_1 = __importDefault(require("./postContact"));
const deleteContactById_1 = __importDefault(require("./deleteContactById"));
const putContactById_1 = __importDefault(require("./putContactById"));
const actions = {
    getContacts: getContacts_1.default,
    getContactById: getContactById_1.default,
    postContact: postContact_1.default,
    deleteContactById: deleteContactById_1.default,
    putContactById: putContactById_1.default,
};
exports.default = actions;
