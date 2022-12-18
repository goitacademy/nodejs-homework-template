const { createError } = require("../../helpers");
const { listContacts } = require("../../models/contactModel/contacts");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

async function getAll(req, res, next) {
  const contacts = await listContacts();

  if (!contacts) {
    throw createError({ status: 404 });
  }

  res.status(200).json({ status: 200, data: contacts });
}
module.exports = getAll;
