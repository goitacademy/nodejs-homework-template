"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const server_logger_1 = require("./helpers/server-logger");
const api_1 = __importDefault(require("./routes/api"));
const app = (0, express_1.default)();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
app.use((0, morgan_1.default)(formatsLogger));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(server_logger_1.serverLogger);
app.use('/api/contacts', api_1.default);
app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
});
app.use((err, req, res, next) => {
    const { status = 500, message = 'Server Error' } = err;
    res.status(status).json({ message });
});
exports.default = app;
