const {getContacts, updateContacts} = require('./getContacts')
const { v4 } = require("uuid")

  


const addContact = async (data) => {
  try {
   const contacts = await getContacts();
  const id = v4()
  const newContact = { id, ...data }
  contacts.push(newContact);
  console.log(newContact)
  await updateContacts(contacts)
  // console.table(contacts)¨
    return newContact
 }
  catch (error) {
    console.log(error)
  }
  
}

module.exports = {
  addContact
}