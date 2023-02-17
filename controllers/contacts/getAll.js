const { createError } = require("../../helpers");
const { listContacts } = require("../../models/contacts");

async function getAll(req, res, next) {
  const data = await listContacts();

  if (!data) {
    throw createError({ status: 404 });
  }

  res.status(200).json(data);
}
module.exports = getAll;
