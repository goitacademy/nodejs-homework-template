const { schemaValidatePost, schemaValidatePut } = require('./schemes');
const { messageStatusCode, paths, PORT } = require('./options');
const { addUniqueId, status, answer } = require('./common');
const { validatePost, validatePut } = require('../middleware');

module.exports = {
  schemaValidatePost,
  schemaValidatePut,
  messageStatusCode,
  validatePost,
  addUniqueId,
  validatePut,
  status,
  answer,
  paths,
  PORT,
};
