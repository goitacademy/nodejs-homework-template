"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contacts_1 = __importDefault(require("../../../controllers/contacts"));
const ctrlTryCatchWrapper_1 = __importDefault(require("../../../helpers/ctrlTryCatchWrapper"));
const router = (0, express_1.Router)();
router.get("/", (0, ctrlTryCatchWrapper_1.default)(contacts_1.default.getAll));
router.get('/:contactId', (0, ctrlTryCatchWrapper_1.default)(contacts_1.default.getById));
router.post("/", (0, ctrlTryCatchWrapper_1.default)(contacts_1.default.add));
router.put('/:contactId', (0, ctrlTryCatchWrapper_1.default)(contacts_1.default.putById));
router.delete('/:contactId', (0, ctrlTryCatchWrapper_1.default)(contacts_1.default.removeById));
router.patch('/:contactId/favorite', (0, ctrlTryCatchWrapper_1.default)(contacts_1.default.updateStatusContact));
exports.default = router;
