import path from "path";
import { promises as fs } from "fs";
//const fs = require("fs/promises");
const contactsPath = path.join(process.cwd(), "db", "contacts.json");

export async function writeDataToFile(data) {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.log(err.message);
  }
}
