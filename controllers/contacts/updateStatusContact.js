const { Contact, joi } = require("../../models");
const { requestError } = require("../../helpers");

const updateStatusContact = async (req, res, next) => {
  try {
    const { error } = joi.favoriteSchema.validate(req.body);
    if (error) {
      throw requestError(400, error.message);
    }
    const { contactId } = req.params;

    const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!contact) {
      throw requestError(404, "Not found");
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = updateStatusContact;
