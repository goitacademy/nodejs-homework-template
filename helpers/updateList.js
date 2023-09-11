import fs from "fs/promises";
import path from "path";

const contactsPath = path.resolve("models", "contacts", "contacts.json");

const updateList = async (contacts) => {
  console.log('contacts: ', contacts);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

export { contactsPath, updateList };
