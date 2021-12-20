import contacts from "../../db/contacts.json";

export default async function getContactById(contactId) {
  const [contact] = contacts.filter((contact) => contact.id === contactId);
  return contact;
}
