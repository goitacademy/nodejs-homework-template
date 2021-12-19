import fs from "fs/promises";
import path from "path";
import contacts from "../../db/contacts.json";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const updateContact = async (contactId, body) => {
  const getId = contacts.findIndex(
    (contact) => contactId === contact.id.toString()
  );
  if (getId === -1) {
    return;
  }
  const updated = { id: contactId, ...contacts[getId], ...body };
  contacts[getId] = updated;
  await fs.writeFile(
    path.join(__dirname, "../../db", "contacts.json"),

    JSON.stringify(contacts, null, 4)
  );
  return updated;
};

export default updateContact;
