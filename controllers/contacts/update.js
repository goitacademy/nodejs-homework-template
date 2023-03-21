const { Contact } = require("../../models/contact");
const createError = require("http-errors");

const update = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

  if (!result) {
    throw createError(404, "not found");
  }

  res.status(200).json({ contact: result });
};

module.exports = update;
