const pino = require("pino");
const pretty = require("pino-pretty");

const logger = pino(pretty());

module.exports = { logger };
