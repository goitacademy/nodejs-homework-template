import path from "path";
import { promises as fs } from "fs";
//const fs = require("fs/promises");
const contactsPath = path.join(process.cwd(), "db", "contacts.json");

export async function readDataFromFile() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.log(err.message);
    return [];
  }
}
