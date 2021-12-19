import fs from "fs/promises";
import path from "path";
import contacts from "../../db/contacts.json";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const removeContact = async (contactId) => {
  try {
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index !== -1) {
      const result = contacts.splice(index, 1);
      await fs.writeFile(
        path.join(__dirname, "../../db", "contacts.json"),
        JSON.stringify(contacts, null, 2)
      );
      return result;
    }
    return null;
  } catch (error) {
    console.log(error.message);
  }
};

export default removeContact;
