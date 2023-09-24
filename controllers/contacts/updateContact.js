const { Contact } = require("../../models/contact");

const { HttpError } = require("../../helpers");

const updateContact = async (req, res, next) => {
  const { name, email, phone, favorite } = req.body;
  const { contactId } = req.params;

  try {
    const contact = await Contact.findByIdAndUpdate(
      contactId,
      { name, email, phone, favorite },
      { new: true }
    );

    if (!contact) {
      return next(HttpError(404, "Contact not found"));
    }

    if (contact.owner.toString() !== req.user.id) {
      return next(HttpError(403, "Forbidden"));
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;