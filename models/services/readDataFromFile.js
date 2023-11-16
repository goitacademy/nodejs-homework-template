import path from "path";
import fs from "fs/promises";

const contactsPath = path.join(process.cwd(), "models", "contacts.json");

export async function readDataFromFile() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.log(err.message);
    return [];
  }
}
