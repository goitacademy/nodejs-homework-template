import fs from "fs/promises";
import path from "path";
import contacts from "../db/contacts.json";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const removeContact = async (contactId) => {
  try {
    const deletedContact = contacts.findIndex(
      (contact) => contactId === contact.id.toString()
    );
    if (deletedContact !== -1) {
      const updateList = contacts.splice(deletedContact, 1);
      await fs.writeFile(
        path.join(__dirname, "../db", "contacts.json"),
        JSON.stringify(contacts, null, 2)
      );
      return updateList;
    }
    return null;
  } catch (error) {
    console.log(error.message);
  }
};
export default removeContact;
