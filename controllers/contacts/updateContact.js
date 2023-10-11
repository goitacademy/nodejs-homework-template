const contacts = require("../../models/contacts");
const requestError = require("../../helpers/requestError");
const contactsSchema = require("../../schemas/contacts");
const updateContact = async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      throw requestError(400, error.message);
    }
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const resolve = await contacts.updateContact(id, name, email, phone);
    res.status(200).json(resolve);
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;
