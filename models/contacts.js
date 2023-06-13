const fs = require('fs/promises')
const path = require('path')

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
    const list = await fs.readFile(contactsPath);
    return JSON.parse(list);
}

const getContactById = async (contactId) => {
  const contacts = await fs.readFile(contactsPath)

    for (let obj of JSON.parse(contacts)) {
      if (obj.id === contactId) {
          return obj;
      }
    }
}

const removeContact = async (contactId) => {

  const allListContacts = await listContacts();
  const idLIst = allListContacts.findIndex(item => item.id === contactId);

  if(idLIst === -1){
      return null;
  }

  const [result] = allListContacts.splice(idLIst, 1);

  await fs.writeFile(contactsPath, JSON.stringify(allListContacts, null, 2));

  return result;

    // const remove = await fs.readFile(contactsPath)      
        
    // try {
    //   await fs.writeFile(contactsPath, JSON.stringify(JSON.parse(remove).filter(
    //     el => {     
    //       return el.id !== contactId
    //     }
    //   ), null, 2))
    // } catch (error) {
    //     return error
    // }
}

const addContact = async (body) => {
    const add = await fs.readFile(contactsPath);
    const {name, email, phone} = body;

    let obj = JSON.parse(add)
    let newObj = {
          id: String(Date.now()),
          name,
          email,
          phone
        }

    obj.push(newObj)

    try {
        await fs.writeFile(contactsPath, JSON.stringify(obj, null, 2))
    } catch (error) {
        return error
    }    
}

const updateContacts = async (contactId, body) => {
 
    // const contacts = await fs.readFile(contactsPath);
    // const parseContacts = JSON.parse(contacts);

    // const updateCon = parseContacts.map((contact) => {
    //   if(contact.id === contactId){
    //     return {...contact, ...{id: contactId, ...body}}
    //   }
    //   return contact
    // })

    // await fs.writeFile(contactsPath, JSON.stringify(updateCon, null, 2))

    // const updatedContact = parseContacts.find((contact) => contact.id === contactId);
    // return updatedContact;

    const contacts = await listContacts();

    const conId = contacts.findIndex((contact) => {
      return contact.id === contactId;
    })

    if (conId === -1) {
      return null
    }

    contacts[conId] = {id: contactId, ...body};

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))

    return contacts[conId]
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContacts,
}
