"use strict";
const __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getAll_1 = __importDefault(require("./getAll"));
const getById_1 = __importDefault(require("./getById"));
const add_1 = __importDefault(require("./add"));
const putById_1 = __importDefault(require("./putById"));
const removeById_1 = __importDefault(require("./removeById"));
const updateStatusContact_1 = __importDefault(require("./updateStatusContact"));
const ctrls = {
    getAll: getAll_1.default,
    getById: getById_1.default,
    add: add_1.default,
    putById: putById_1.default,
    removeById: removeById_1.default,
    updateStatusContact: updateStatusContact_1.default,
};
exports.default = ctrls;
