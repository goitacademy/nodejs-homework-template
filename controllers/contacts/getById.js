const Contact = require("../../models/Contacts");
const { createError } = require("../../helpers");

async function getById(req, res) {
  const { id } = req.params;

  const result = await Contact.findById(id);

  if (!result) {
    throw createError({ status: 404, message: "Not found" });
  }

  res.json(result);
}

module.exports = getById;
