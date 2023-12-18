const { updateContact } = require("../../models/contacts/index");
const HttpError = require("../../helpers/HttpError");

const updateContactData = async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone, favorite } = req.body;

  if (!name && !email && !phone && favorite === undefined) {
    const missingFields = ["name", "email", "phone", "favorite"];
    return next(
      new HttpError(400, `Missing required fields: ${missingFields.join(", ")}`)
    );
  }

  try {
    const updatedContact = await updateContact(contactId, {
      name,
      email,
      phone,
      favorite,
    });
    if (updatedContact) {
      res.json(updatedContact);
    } else {
      next(new HttpError(404, "Not found"));
    }
  } catch (error) {
    next(new HttpError(500, "Internal Server Error"));
  }
};

module.exports = updateContactData;
