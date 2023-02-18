const contactsOperations = require("../../models/contacts");
const { HttpError } = require("../../helpers/HttpError");

const getContactId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await contactsOperations.getContactById(
      id
    );
    if (!contact) {
      throw HttpError(404, "Not found");
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = getContactId;
