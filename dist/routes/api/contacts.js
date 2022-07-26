"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const actions_1 = __importDefault(require("./actions"));
const verifyAction_1 = __importDefault(require("./helpers/verifyAction"));
const router = express_1.default.Router();
router.get("/", async (req, res, next) => {
    await (0, verifyAction_1.default)(req, res, next, actions_1.default.getContacts);
});
router.get('/:contactId', async (req, res, next) => {
    await (0, verifyAction_1.default)(req, res, next, actions_1.default.getContactById);
});
router.post("/", async (req, res, next) => {
    await (0, verifyAction_1.default)(req, res, next, actions_1.default.postContact);
});
router.delete('/:contactId', async (req, res, next) => {
    await (0, verifyAction_1.default)(req, res, next, actions_1.default.deleteContactById);
});
router.put('/:contactId', async (req, res, next) => {
    await (0, verifyAction_1.default)(req, res, next, actions_1.default.putContactById);
});
exports.default = router;
