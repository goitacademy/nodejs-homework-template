const operations = require("../../models/contacts");
const Joi = require("joi");
const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});
const update = async (req, res) => {
  const { contactId } = req.params;
  const body = req.body;
  const { error } = schema.validate(body);
  if (error) {
    error.status = 400;
    throw error;
  }
  const updatedContact = await operations.updateContact(contactId, body);
  if (!updatedContact) {
    const error = new Error("Not found");
    error.status = 404;
    throw error;
  }
  res.json({
    status: "updated success",
    data: {
      result: updatedContact,
    },
  });
};

module.exports = update;
