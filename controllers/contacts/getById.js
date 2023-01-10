const { Contacts, HttpError } = require("../../models");

const getById = async (req, res, next) => {
  const { id } = req.params;
  const contact = await Contacts.findById(id);
  if (!contact) {
    return next(new HttpError(404, "Contact not found"));
  }
  return res.json(contact);
};

module.exports = getById;
