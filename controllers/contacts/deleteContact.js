const contactsOperations = require("../../models/contacts");
const { HttpError } = require("../../helpers/HttpError");

const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await contactsOperations.removeContact(
      id
    );
    if (!contact) {
      throw HttpError(404, "Not found");
    }
    res.json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteContact;
