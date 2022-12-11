const { createError } = require("../../helpers");
const { listContacts } = require("../../models/contacts");

async function getAll(req, res, next) {
  try {
    const data = await listContacts();

    if (!data) {
      throw createError({ status: 404 });
    }

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}
module.exports = getAll;
