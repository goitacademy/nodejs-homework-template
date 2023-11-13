const express = require('express');
const routerContacts = require('./contacts');
const routerIndex = express.Router();

module.exports = () => {
  routerIndex.use('/Contacts', routerContacts);

  return routerIndex;
};
