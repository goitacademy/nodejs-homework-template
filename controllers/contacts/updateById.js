const { createError } = require("../../helpers");
const { Contact } = require("../../models/contact");

const updateById = async (req, res, next) => {
  const body = req.body;
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, body, { new: true });
  if (!result) {
    throw createError(404);
  }
  res.json(result);
};

module.exports = updateById;
