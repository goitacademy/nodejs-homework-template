import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import contacts from "./contacts.json";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const addContact = async (name, email, phone) => {
  const addContact = {
    id: randomUUID(),
    name,
    email,
    phone,
  };
  contacts.push(addContact);
  await fs.writeFile(
    (__dirname, "../contacts.json"),
    JSON.stringify(contacts, null, 2)
  );
  return addContact;
};

export default addContact;
