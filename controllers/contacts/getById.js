async function getById(id) {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === id);
  if (!contact) {
    return null;
  }
  return contact;
}