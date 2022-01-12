import fs from "fs/promises";
import path from "path";
import chalk from "chalk";
import contacts from "../../db/contacts.json";

const __dirname = path.dirname("db/contacts");

export const removeContact = async (contactId) => {
  try {
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
      return;
    }
    const [delContact] = contacts.splice(index, 1);
    await fs.writeFile(
      path.join(__dirname, "contacts.json"),
      JSON.stringify(contacts, null, 2)
    );
    return delContact;
  } catch (error) {
    console.error(chalk.bgRed(error));
    process.exit(1);
  }
};

// export default removeContact;