const updateContacts = require('./updateContacts')
const getAll = require('./getAll')


const updateContactById = async (contactId, data) => {
    const contactList = await getAll();
    const idx = contactList.findIndex(contact => contact.id === Number(contactId));
    if(idx === -1){
      return null;
    }
    contactList[idx] = {id: Number(contactId), ...data};    
    await updateContacts(contactList)
    return contactList[idx];
  }


module.exports = updateContactById