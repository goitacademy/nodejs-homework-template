const fs = require("fs/promises");
const path = require("path");
const Joi = require("joi");

const contactsPath = path.join(__dirname, "contacts.json");

const updateContactsJson = async (contacts) => {
  const str = JSON.stringify(contacts);
  await fs.writeFile(contactsPath, str);
};

const contactScheme = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(2).required(),
});

module.exports = {
  updateContactsJson,
  contactScheme,
};
