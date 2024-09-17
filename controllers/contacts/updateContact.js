const { NotFound } = require("http-errors");
const contacts = require("../../models/contacts");

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);

    if (!result) {
      throw new NotFound(`Not found`);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;
