const { Contact } = require("../../models/contact");
const { HttpError } = require("../../helpers");

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  try {
    const contact = await Contact.findOneAndUpdate(
      { _id: contactId, owner: req.user.id },
      { favorite },
      { new: true }
    );

    if (!contact) {
      return next(HttpError(404, "Contact not found"));
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = updateStatusContact;
