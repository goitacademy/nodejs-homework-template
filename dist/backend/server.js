"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const setEnvVariables_1 = __importDefault(require("../config/setEnvVariables"));
const app_1 = __importDefault(require("./app"));
const connectDB_1 = __importDefault(require("../config/connectDB"));
const colors_1 = __importDefault(require("colors"));
(0, setEnvVariables_1.default)();
const start = async () => {
    try {
        const { PORT = 5000 } = process.env;
        await (0, connectDB_1.default)();
        app_1.default.listen(PORT, () => {
            console.log(`Server running. Use our API on port: ${PORT}`);
        });
    }
    catch (error) {
        console.log(colors_1.default.red(error.message.bold));
        process.exit(1);
    }
};
(async () => {
    await start();
})();
