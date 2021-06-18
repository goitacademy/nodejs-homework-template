const checkIfContactExists = (contacts, newContact) => {
  const contactFound = contacts.find(
    contact => contact.name.toLowerCase() === newContact.name.toLowerCase(),
  );
  if (contactFound !== undefined) {
    return true;
  }
  return false;
};

module.exports = { checkIfContactExists };
