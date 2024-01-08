const { constants } = require("../vars");

exports.serverConfig = {
    PORT: Number(process.env.PORT) || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DB_URI: process.env.DB_URI || 'mongodb://localhost:27017',
    SECRET_KEY: process.env.SECRET_KEY || 'secret phrase',
    JWT_EXPIRES: process.env.JWT_EXPIRES || '1h',
    MAX_FILE_SIZE_UPLOAD: 2*constants.oneMbSize,
};
