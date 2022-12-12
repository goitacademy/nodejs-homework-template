const Contact = require("../../models/contact");

const { httpError } = require("../../helpers");

const { addSchema } = require("../../schemas/contactsSchema");

const updateById = async (req, res) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw httpError(400, error.message);
  }

  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw httpError(404);
  }

  res.json(result);
};

module.exports = updateById;
