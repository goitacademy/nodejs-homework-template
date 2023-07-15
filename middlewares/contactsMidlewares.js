const fs = require("fs").promises;

const { AppError, catchAsync } = require("../utils");

/**
 * Check user exists in db by id middleware.
 */
exports.checkContactsById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (id.length < 10) throw new AppError(400, "Invalid ID..");

  const contacts = JSON.parse(await fs.readFile("./models/contacts.json"));

  const contact = contacts.find((item) => item.id === id);

  if (!contact) throw new AppError(400, "Contact does not exist..");

  req.contact = contact;

  next();
});
