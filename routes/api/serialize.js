const serializeContact = ({ id, name, email, phone }) => ({
  id,
  name,
  email,
  phone,
});

exports.serializeContactResponce = contact => ({
  contact: serializeContact(contact),
});

exports.serializeContactsListResponce = contacts => ({
  contacts: contacts.map(serializeContact),
});
