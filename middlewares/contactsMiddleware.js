const { listContacts } = require("../models/contacts");
const { AppError } = require("../utils/appError");

const checkId = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contactsList = await listContacts();

    const contact = contactsList.find((contact) => contact.id === contactId);

    if (!contact) return next(new AppError(404, "Not found"));

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkId,
};
