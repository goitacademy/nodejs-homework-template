const get = require("./get");
const getById = require("./getById");
const remove = require("./remove");
const add = require("./add");
const update = require("./update");
const patch = require("./patch");
const contactDdbPath = require("./dbPath");

const contactsApi = { get, getById, remove, add, update, patch };

module.exports = { contactsApi, contactDdbPath };
