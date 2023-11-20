import path from "path";
import fs from "fs/promises";

const contactsPath = path.join(process.cwd(), "models", "contacts.json");

export async function writeDataToFile(data) {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.log(err.message);
  }
}
