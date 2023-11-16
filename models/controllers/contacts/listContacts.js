import { readDataFromFile } from "../../services/readDataFromFile.js";

export async function listContacts() {
  const contacts = await readDataFromFile();
  console.table(contacts);
}
