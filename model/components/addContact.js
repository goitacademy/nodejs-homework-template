import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import contacts from "../contacts.json";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const addContact = async ({ name, email, phone }) => {
  const newContact = { id: randomUUID(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(
    path.join(__dirname, "../contacts.json"),
    JSON.stringify(contacts, null, 4)
  );
  return newContact;
};

export default addContact;
