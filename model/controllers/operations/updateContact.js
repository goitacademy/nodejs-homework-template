import fs from "fs/promises";
import path from "path";
import contacts from "./contacts.json";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const updateContact = async (contactId, body) => {
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index !== -1) {
    const updatedContact = { id: contactId, ...contacts[index], ...body };
    contacts[index] = updatedContact;
    await fs.writeFile(
      path.join(__dirname, "../contacts.json"),
      JSON.stringify(contacts, null, 2)
    );
    return updatedContact;
  }
  return null;
};
export default updateContact;
