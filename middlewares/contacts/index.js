// ./midlewares/contacts/index.js

const { checkBoolean } = require('./checkBoolean');
const { checkContactId } = require('./checkContactId');
const { checkCreateContactData } = require('./checkCreateContactData');

module.exports = {
  checkBoolean,
  checkContactId,
  checkCreateContactData,
};
