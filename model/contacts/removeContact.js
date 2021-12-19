import contacts from "../../db/contacts.json";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const removeContact = async (contactId) => {
  const getId = contacts.findIndex(
    (contact) => contactId === contact.id.toString()
  );
  if (getId === -1) {
    return;
  }

  const update = contacts.splice(getId, 1);
  console.log("RemoveContact is done!");

  await fs.writeFile(
    path.join(__dirname, "../../db", "contacts.json"),

    JSON.stringify(contacts, null, 4)
  );
  return update;
};

export default removeContact;
