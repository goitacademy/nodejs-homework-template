const express = require("express");
const routerContacts = require("./api/contacts");

const routerIndex = express.Router();

module.exports = () => {
  routerIndex.use("/contacts", routerContacts());
  return routerIndex;
};
