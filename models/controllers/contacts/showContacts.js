import { listContacts } from "./indexContacts.js";

export async function getContactById(contactId) {
  try {
    const data = await listContacts();
    const contact = data.find((element) => element.id === contactId);
    return contact;
  } catch (e) {
    console.log(e.toString());
  }
}
