const fs = require("fs/promises"); // модуль функций
const path = require("path");
const contactsPath = path.join(__dirname, "../contacts.json");

const readData = async () => {
  const result = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(result);
};

const removeContact = async (contactId) => {
  const contacts = await readData();
  const newList = contacts.filter(
    (contact) => String(contact.id) !== contactId
  );
  await fs.writeFile(contactsPath, JSON.stringify(newList, null, 2));

  contacts.length === newList.length
    ? console.log(` Contact with id ${contactId} not found`)
    : console.log(`Contact with id ${contactId} was deleted`);

  console.table(newList);
};

module.exports = removeContact;
