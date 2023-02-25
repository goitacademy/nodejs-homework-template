const { RequestError } = require("../../helpers");
const { Contact } = require("../../models/contact");
const { updateFavoriteSchema } = require("../../schema/contacts");

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { error } = updateFavoriteSchema.validate(req.body);
  if (error) {
    throw RequestError(400, error.message);
  }

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.status(201).json(result);
};

module.exports = updateStatusContact;
