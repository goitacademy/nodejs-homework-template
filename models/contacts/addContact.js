import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import contacts from "../../db/contacts.json";
import { dirname } from "../../dirname";

export default async function addContact({ name, email, phone }) {
  const newContact = { id: randomUUID(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(
    path.join(dirname(), "db", "contacts.json"),
    JSON.stringify(contacts, null, 2)
  );
  return newContact;
}
