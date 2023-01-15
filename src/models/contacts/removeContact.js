const getContactsList = require('../lib/getContactsList');
const writeContacts = require('../lib/writeContacts');

const removeContact = async (contactId) => {
  try {
    const contacts = await getContactsList();
    const idx = contacts.findIndex((item) => item.id ===contactId);
    if(idx===-1){
      return null;
    } 
    const [removeContact] = contacts.splice(idx, 1);
    await writeContacts(contacts);
    return removeContact;
  } catch (err) {
    return console.log(err.message);
  }
}

// const removeAllContacts = async (res) => {
//   try {
//    await writeContacts([]);
//    res.status(200).json({ message: `All users was removed` });;
//   } catch (err) {
//     return console.log(err.message);
//   }
// }

module.exports = removeContact();