const Contacts = require("../../models/contact");
const { HttpError } = require("../../helpers/HttpError");

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contacts.findOneAndRemove({_id: contactId});

    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.json({ message: "Contact deleted" });

  } catch (error) {
      next(error);
  }
}

module.exports = deleteContact;