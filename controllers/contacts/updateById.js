const createError = require("http-errors");
const { Contact } = require("../../models");

const updateById = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw createError(404, "Not found");
  }
  console.log("result", result);
  res.json(result);
};

module.exports = updateById;
