import fs from "fs/promises";
import path from "path";
import chalk from "chalk";
import contacts from "../../db/contacts.json";

const __dirname = path.dirname("db/contacts");

export const updateContact = async (contactId, body) => {
  try {
    let updContact = contacts.find((item) => item.id === contactId);
    if (!updContact) {
      return;
    }
    updContact = { ...updContact, ...body };
    const index = contacts.findIndex((item) => item.id === contactId);
    contacts.splice(index, 1, updContact);
    await fs.writeFile(
      path.join(__dirname, "contacts.json"),
      JSON.stringify(contacts, null, 2)
    );
    return updContact;
  } catch (error) {
    console.error(chalk.bgRed(error));
    process.exit(1);
  }
};

// export default updateContact;