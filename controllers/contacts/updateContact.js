const { Contact } = require('../../models/contact');

const updateContact = async (contactId, body) => {
  try {
    let data = await listContacts();
    const index = data.findIndex(item => item.id === contactId);
    if (index === -1) {
      return null;
    }
    const updateContact = {
      ...data[index],
      ...body,
    };
    data.splice(index, 1, updateContact);
    fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
    return updateContact;
  } catch (error) {
    return error;
  }
};

module.exports = updateContact;