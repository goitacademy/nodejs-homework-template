const fs = require("fs/promises");
const path = require("path");
const filePath = path.join(__dirname, "/contacts.json");
const {v4} =require('uuid');
// const listContacts = async (data) => {
//   await fs.readFile(filePath, JSON.stringify(data), "utf-8");
// };

// const getContactById = async (contactId) => {
//   try {
//     const contacts = await listContacts();
//     return contacts.find((contact) => contact.id === contactId);
//   } catch (error) {
//     console.log(error);
//   }
// };

// const removeContact = async (contactId) => {
//   try{
//     const contacts = await listContacts();
//     const deleteContacts = contacts.filter(contact => contact.id !== contactId);
//     await updatedList(deleteContacts);
//     return contacts.find((contact) => contact.id === contactId);

//   } catch(error){
//     console.log(error)
//   }
// };

// const addContact = async (body) => {
//   try {
//     const contacts = await listContacts();
//     contacts.push(body);
    
    
//   }catch(error){
//     console.log(error)
//   }
// };

// const updateContact = async (contactId, body) => {
//   try{
//     const contacts = await listContacts();
//     const index = contacts.findIndex((item) => item.id === contactId);
//     if(index === -1){
//       return null;
//     }
//     contacts[index] = {...contacts[index], ...body}
//   }catch(error){console.log(error)}
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };

const listContacts = async () => {
  const data = await fs.readFile(contactsPath)
  const contacts = JSON.parse(data);
  return contacts;
}

const getContactById = async (id) => {
const contacts = await listContacts();
const userId = contacts.find(itme => itme.id === id)
return userId;
}

const removeContact = async (id) => {
const contacts = await listContacts();
const idx = contacts.findIndex(item => item.id === id.toString());
if(idx === -1){
  return null;
}
const [delUser] = contacts.splice(idx, 1);
await fs.writeFile(contactsPath, JSON.stringify(contacts));
return delUser;

}

const addContact = async (body) => {
const contacts = await listContacts();
const updateId = {...body, id: v4()}
const newContact = [...contacts, updateId];
await fs.writeFile(contactsPath, JSON.stringify(newContact));
return newContact;
}
const updateContact = async (id, body) => {
	const contacts = await listContacts();
	const idx = contacts.findIndex(item => item.id === id);
	if(idx === -1){
		return null;
	}
	contacts[idx] = {...body, id};
	await fs.writeFile(contactsPath, JSON.stringify(contacts));
	return contacts[idx];

}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};