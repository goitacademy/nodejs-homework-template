const { Contact } = require("../../models/contact");
const { HttpError } = require("../../helpers");

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const { id: owner } = req.user;

  try {
    const contact = await Contact.findOne({ _id: contactId, owner });

    if (!contact) {
      return next(HttpError(404, "Contact not found"));
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = getContactById;
