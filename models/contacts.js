
const fs = require("fs/promises");
const path  = require("path")
const contactsPath = path.join(__dirname,"/contacts.json") ;
const { v4: uuidv4 } = require('uuid');





const listContacts= async()=>{
        const data = await fs.readFile(contactsPath);
        const contacts  =JSON.parse(data);
       
        return contacts;
};

const getContactById= async(contactId)=> {
const contacts = await listContacts();
const result = contacts.find(item=>item.id===contactId);
if(!result){
    return null;
}
return result;
 };

const addContact= async(name,email,phone)=>{
    
    const contacts = await listContacts();
    const newContact = {id:uuidv4(),name,email,phone};
    contacts.push(newContact);
    await fs.writeFile(contactsPath,JSON.stringify(contacts))
    return newContact
    
}
const removeContact= async(contactId)=> {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item=>item.id===contactId);
    if(idx===-1){
        return null;
    }
    const newContacts = contacts.filter((_,index)=>index!==idx);
    await fs.writeFile(contactsPath,JSON.stringify(newContacts));
    return contacts[idx]  
}
const updateContact = async(id,contactData)=>{
    const contacts  = await listContacts();
    const index = contacts.findIndex(item=>item.id===id);
    if(index===-1){
        return null
    }
    contacts[index] = {...contactData,id};
    await fs.writeFile(contactsPath,JSON.stringify(contacts))
    return contacts[index];
    
}
  


  


module.exports = {listContacts,removeContact,getContactById,addContact,updateContact};

// const listContacts = async () => {}

// const getContactById = async (contactId) => {}

// const removeContact = async (contactId) => {}

// const addContact = async (body) => {}

// const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
