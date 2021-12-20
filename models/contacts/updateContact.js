import fs from "fs/promises";
import path from "path";
import contacts from "../../db/contacts.json";
import { dirname } from "../../dirname";

export default async function updateContact(contactId, body) {
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index !== -1) {
    const updatedContact = { id: contactId, ...contacts[index], ...body };
    contacts[index] = updatedContact;
    await fs.writeFile(
      path.join(dirname(), "db", "contacts.json"),
      JSON.stringify(contacts, null, 2)
    );
    return updatedContact;
  }

  return null;
}
