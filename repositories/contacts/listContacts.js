import { readDataFromDb } from "../../services/readDataFromDb.js";

export async function listContacts() {
  const contacts = await readDataFromDb();
  return contacts;
}
