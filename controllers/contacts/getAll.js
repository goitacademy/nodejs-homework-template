const { createError } = require("../../helpers");
const { listContacts } = require("../../models/contacts");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

async function getAll(req, res, next) {
  const data = await listContacts();

  if (!data) {
    throw createError({ status: 404 });
  }

  res.status(200).json(data);
}
module.exports = getAll;
