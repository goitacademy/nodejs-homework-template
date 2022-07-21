const { Contact } = require("../../models/contact");
const { createError } = require("../../helpers");

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
    select: "-__v",
  });

  if (!result) {
    throw createError(404);
  }
  res.json(result);
};

module.exports = updateById;
