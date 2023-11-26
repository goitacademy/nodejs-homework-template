// router/index.js
const express = require("express");
const routerContacts = require("./api/contacts");
const routerAuth = require("./api/auth");

const routerIndex = express.Router();

module.exports = () => {
  routerIndex.use("/auth",  routerAuth());
  routerIndex.use("/contacts", routerContacts());

  return routerIndex;
};
