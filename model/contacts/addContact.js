import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import chalk from "chalk";
import contacts from "../../db/contacts.json";

const __dirname = path.dirname("db/contacts");

export const addContact = async (body) => {
  try {
    const newContact = { id: randomUUID(), ...body };
    contacts.push(newContact);
    await fs.writeFile(
      path.join(__dirname, "contacts.json"),
      JSON.stringify(contacts, null, 2)
    );
    return newContact;
  } catch (error) {
    console.error(chalk.bgRed(error));
    process.exit(1);
  }
};

// export default addContact;