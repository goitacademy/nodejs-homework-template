const serializeContact = ({ id, name, email, phone, favorite }) => ({
  id,
  name,
  email,
  phone,
  favorite,
});

exports.serializeContactResponce = contact => ({
  contact: serializeContact(contact),
});

exports.serializeContactsListResponce = contacts => ({
  contacts: contacts.map(serializeContact),
});
