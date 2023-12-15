const { addContact } = require("../../models/contacts/index");
const HttpError = require("../../helpers/HttpError");

const createContact = async (req, res, next) => {
  const { name, email, phone, favorite } = req.body;

  if (!name || !email || !phone) {
    const missingFields = ["name", "email", "phone"];
    return next(
      new HttpError(400, `Missing required fields: ${missingFields.join(", ")}`)
    );
  }

  if (favorite === undefined) {
    return next(new HttpError(400, "Missing required field: favorite"));
  }

  const newContact = await addContact({ name, email, phone, favorite });
  res.status(201).json(newContact);
};

module.exports = createContact;
