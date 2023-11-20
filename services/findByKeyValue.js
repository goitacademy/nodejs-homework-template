export function findByKeyValue(contacts, searchedKey, searchedItem) {
  return contacts.find(
    (contact) =>
      contact[searchedKey]?.toLowerCase().replace(/\s/g, "") ===
      searchedItem.toLowerCase().replace(/\s/g, "")
  );
}
