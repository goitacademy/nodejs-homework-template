"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const port = 9991;
app_1.default.listen(9991, () => {
    console.log(`Server running. Use our API on port: ${port}`);
});
