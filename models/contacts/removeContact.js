import fs from "fs/promises";
import path from "path";
import { dirname } from "../../dirname";
import contacts from "../../db/contacts.json";

export default async function removeContact(contactId) {
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index !== -1) {
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(
      path.join(dirname(), "db", "contacts.json"),
      JSON.stringify(contacts, null, 2)
    );
    return result;
  }

  return null;
}
