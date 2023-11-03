const express = require('express');
const routerContacts = require('./contacts');
const routerIndex = express.Router();

module.exports = () => {
  routerIndex.use('/api/Contacts', routerContacts);

  return routerIndex;
};
