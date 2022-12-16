async function removeContact(id) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === id);
  if (idx === -1) {
    return null;
  }
  const [removedContact] = contacts.splice(idx, 1);
  fs.writeFile(contactsPath, JSON.stringify(contacts));
  return removedContact;
}