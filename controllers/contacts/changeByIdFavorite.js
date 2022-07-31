const { Contact, shemas } = require("../../models/contacts");
const { createError } = require("../../helpers");

const changeFavorite = async (req, res, next) => {
  const { error } = shemas.update.validate(req.body);
  if (error) {
    res.status(400).json({
      status: 400,
      data: { message: "Missing field favorite" },
    });
  }
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw createError(404);
  }
  res.json(result);
};
module.exports = changeFavorite;
