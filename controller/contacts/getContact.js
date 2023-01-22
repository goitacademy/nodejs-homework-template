const Contacts = require("../../models/contacts");
const { NotFound } = require("http-errors");

// get contact by Id
const getContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { _id } = req.user;

    const contact = await Contacts.findOne({ _id: contactId, owner: _id });

    if (!contact) {
      next(NotFound("Not Found"));
    }

    return res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = getContact;
