// router/index.js
const express = require("express");
const routerContacts = require("./api/contacts");
const routerUsers = require("./api/users");
const routerAuth = require("./api/auth");
const routerIndex = express.Router();

module.exports = () => {
  routerIndex.use("/api/auth", routerAuth());
  routerIndex.use("/api/contacts", routerContacts());
  routerIndex.use("/users/", routerUsers());

  return routerIndex;
};
