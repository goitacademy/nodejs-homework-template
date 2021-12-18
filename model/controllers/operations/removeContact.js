import fs from "fs/promises";
import path from "path";
import contacts from "../contacts.json";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const removeContact = async (contactId) => {
  const id = contacts.findIndex(
    (contact) => contactId === contact.id.toString()
  );
  if (id === -1) {
    return null;
  }

  const update = contacts.splice(id, 1);
  await fs.writeFile(
    path.join(__dirname, "../contacts.json"),
    JSON.stringify(contacts, null, 2)
  );
  return update;
};

export default removeContact;