"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../../../middlewares/auth"));
const ctrlTryCatchWrapper_1 = __importDefault(require("../../../helpers/ctrlTryCatchWrapper"));
const auth_2 = __importDefault(require("../../../controllers/auth"));
// import Auth from '../../../controllers/auth'
const router = (0, express_1.Router)();
router.use('/current', auth_1.default, (req, res) => {
    res.send("Test 'current' router");
});
router.use('/signup', (0, ctrlTryCatchWrapper_1.default)(auth_2.default.signup));
router.use('/login', (0, ctrlTryCatchWrapper_1.default)(auth_2.default.login));
// router.use('/logout', auth, ctrlTryCatchWrapper(ctrls.logout);
exports.default = router;
