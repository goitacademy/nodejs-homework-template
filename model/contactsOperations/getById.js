const getAll = require('./getAll')

async function getContactById(contactId) {
  try {
    // const data = await fs.readFile(contactsPath);
    // const contacts = JSON.parse(data);
    const contacts = await getAll()

    const idx = contacts.findIndex((item) => item.id === contactId)
    if (idx === -1) {
      return null
    }
    return contacts[idx]
    // return console.log(contacts[idx]);
  } catch (error) {
    console.log(error.message)
  }
}
module.exports = getContactById
