const { Contact } = require("../models/contactsShema");
const { createError } = require("../helpers");

const getById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const result = await Contact.findById(id);
  if (!result) {
    throw createError(404);
  }
  res.json(result);
};

module.exports = getById;
