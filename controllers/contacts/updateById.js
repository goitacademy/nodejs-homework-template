async function updateContact(id) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === id);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { id, ...contacts };
  await updateContact(contacts);
  return contacts[idx];
}