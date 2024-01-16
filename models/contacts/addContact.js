import { readContacts, writeContacts } from "../../helpers/index.js";

export const addContact = async ({ id, name, email, phone }) => {
  const contacts = await readContacts();

  const newContact = {
    id,
    name,
    email,
    phone,
  };
  const contactWithSameName = contacts.find((contact) => contact.name === name);

  if (contactWithSameName) {
    throw new Error(`Contact with name ${name} already exists in contacts.`);
  }

  contacts.push(newContact);
  await writeContacts(contacts);

  return newContact;
};
