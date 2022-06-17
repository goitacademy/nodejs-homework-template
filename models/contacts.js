
 const removeContact = async (contactId) => {
  //  const result = await listContacts()
  //    .then(data => JSON.parse(data).filter(({id}) => id !== contactId))

  //    try {
  //      await fs.writeFile(contactsPath, JSON.stringify(result))  
  //    } catch (err) { console.error(err) }
 }

 const updateContact = async (contactId, body) => {

  //  const result = await listContacts().then(data => JSON.parse(data))
  //  const arayNotChange = result.filter(({id}) => id !== contactId)

  //  const findContact = result.find(({id}) => id === contactId)

  //  const updateContact = {
  //    ...findContact,
  //    ...body
  //  }

  //  try {
  //      await fs.writeFile(contactsPath, JSON.stringify([...arayNotChange, updateContact]))
  //      return JSON.stringify(updateContact)
  //  } catch (err) {
  //      console.error(err)
  //    }
 }

module.exports = {
  removeContact,
  updateContact,
}
