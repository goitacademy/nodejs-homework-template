const path = require("path");

const contactsFilePath = path.join(
  __dirname,
  "..",
  "..",
  "db",
  "contacts.json"
);

module.exports = contactsFilePath;
