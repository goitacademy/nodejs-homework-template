const { PORT } = require('./port');
const { paths } = require('./paths');
const messageStatusCode = require('./messageStatusCode');
const { messages } = require('./configMessagesSchemes');

module.exports = { PORT, paths, messageStatusCode, messages };
