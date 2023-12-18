const path = require("path");
const fs = require("fs").promises;

const { catchAsync, HttpError } = require("../utils");

exports.checkContactId = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (id.length < 21) throw new HttpError(400, "Invalid ID!");

  const pathToJson = path.join("models", "contacts.json");
  const contactsDB = await fs.readFile(pathToJson);

  const contacts = JSON.parse(contactsDB);
  const contact = contacts.find((u) => u.id === id);

  if (!contact) throw new HttpError(404, "Not found");

  req.contact = contact;

  next();
});
