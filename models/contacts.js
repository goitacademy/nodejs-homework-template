const path = require('path');
const fs = require('fs').promises;
const {validationData} = require('../contactMiddleware/contactMiddleware')
const contactsPath=path.join('models','contacts.json');

const writeFileContacts= async(contacts)=>{
  try{
    const data=JSON.stringify(contacts);
    await fs.writeFile(contactsPath,data);      
  } catch (err){
    console.error(err)
  }
}

const listContacts = async()=>{
  try{
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);     
  } catch (err){
    console.error(err)
  }
}

const  getContactById = async (contactId)=> { 
  const contacts = await listContacts();
  return contacts.find((contact)=>contact.id===contactId) 
}

const removeContact = async(contactId)=> {
  const newListContacts =[];
  const contacts = await listContacts(); 
  contacts.map((contact) => {
    if (contact.id!==contactId){
    newListContacts.push(contact)
    }
  }) 

  await writeFileContacts(newListContacts);  
} 

const  addContact= async(id,name,email,phone)=> {
  const validData =await validationData(name, email, phone);  
  if(validData===false){    
    return {"massage":'The data you are submitting is not valid'}
  } else{
    const newContact ={"id":`${id}`,"name":`${validData.name}`,"email":`${validData.email}`,"phone":`${validData.phone}`};
    const contacts = await listContacts();      
    contacts.push(newContact);
    await writeFileContacts(contacts);
    return  newContact;
  }  
} 

const updateContact = async (contactId,name,email,phone ) => { 
  const validData = await validationData(name, email, phone);
  if(validData===false){    
    return {"massage":'The data you are submitting is not valid'}
  } else{
    await removeContact(contactId);
    await addContact(contactId,name,email,phone);
    return  {"id":`${contactId}`,"name":`${validData.name}`,"email":`${validData.email}`,"phone":`${validData.phone}`};
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact  
};




