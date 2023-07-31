const { Contact } = require("../../models");

// const schema = require("../../schemas");

const { HttpError } = require("../../helpers");

const updateContact = async (req, res, next) => {
  // const { error } = schema.contactSchemas.addContactSchema.validate(req.body);
  // if (error) {
  //   throw HttpError(400, "missing fields");
  // }
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = updateContact;
