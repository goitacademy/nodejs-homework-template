const Contacts = require('./shemas/contact')

//, 1 - лист контактов:
const listContacts = async () => await Contacts.find()
 
//, 2 -  получить контакт по ID:
const getContactById = async (contactId) => await Contacts.findOne({ _id: contactId })

 //, 3- удалить контакт (по ID):
const removeContact = async (contactId) => await Contacts.findByIdAndRemove({ _id: contactId })

//, 4 - добавить контакт
const addContact = async (body) => await Contacts.create(body)
   
//, 5 - заменить , изменить свойство в конакте:
const updateContact = async (contactId, body) => {
 const result =  await Contacts.findByIdAndUpdate(
    { _id: contactId },
    { ...body },
    { new: true }
  )
  return result
}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}

