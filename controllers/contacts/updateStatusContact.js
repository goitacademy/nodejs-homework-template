const { Contact, contactsJoiSchemas } = require("../../models");
const { RequestError } = require("../../helpers");

const updateStatusContact = async (req, res, next) => {
  try {
    const { error } = contactsJoiSchemas.favoriteSchema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }
    const { contactId } = req.params;

    const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!contact) {
      throw RequestError(404, "Not found");
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = updateStatusContact;
