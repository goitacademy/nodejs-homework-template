const getContactsList = require('../lib/getContactsList');
const writeContacts = require('../lib/writeContacts');


const updateContact = async (contactId, body) => {
  try {
    const contacts = await getContactsList();
    const idx = contacts.findIndex((item) => item.id ===contactId);
    if(idx===-1){
      return null;
    } 

  if(!body){
    return null;
  }
    contacts[idx] = {id:contactId, ...body }
    await writeContacts(contacts);
    return contacts[idx];
  } catch (err) {
    return console.log(err.message);
  }
}

module.exports = updateContact();

