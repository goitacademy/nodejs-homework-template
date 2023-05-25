const { contactsSchema } = require("../../schemas");
const { HttpError } = require("../../helpers");
const { Contact } = require("../../models");

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "missing fields");
    }
    const result = await Contact.findOneAndUpdate({ _id: contactId }, req.body);
    if (!result) {
      throw HttpError(404, `not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;
