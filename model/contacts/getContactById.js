const listContacts = require("./listContacts")

async function getContactById(id) {
    const contacts = await listContacts();
    console.log(contacts)
    const contact = contacts.find((el) => el.id === id);
    if (!contact) {
      return null;
    }
    return contact;
  }

  module.exports = getContactById