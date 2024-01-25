// /* eslint-disable spaced-comment */
import fs from "fs";
import path from"path";
import { Contact } from "../controllers/service/schemas/user.js"

const contactsPath = path.resolve("./models/contacts.json");
const data = fs.readFileSync(contactsPath);

let newContact = {};

const validate = async (contactId) => {
    try {      
      const contact = await Contact.findOne({ _id: contactId })
      return  contact;
} catch (err) {
  return console.log(err.message);
  }
}
const filteredContacts = (contactId) => contacts.filter((contact) => contact.id !== contactId)
const saveFile = () => {
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (err) => {
    if (err) {
      return console.log(`Reading error: ${err.message}`);      
    }
  });
}

const listContacts = async () => {
  try {      
      const contacts =  await Contact.find()
       return  contacts;
} catch (err) {
  return console.log(err.message);
  }
}

const getById = async (contactId) => {
    try {      
      const contact = await Contact.findOne({ _id: contactId })
       return  contact;
} catch (err) {
  return console.log(err.message);
  }
}

const addContact = async (contact) => {
    const newContact = new Contact({
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
    favorite: contact.favorite
  })
  
  await newContact.save()
  return newContact
  
}

const removeContact = async (contactId) => {
  
  try {      
      const contact = await Contact.findOneAndDelete({ _id: contactId })
    return contact
} catch (err) {
  return console.log(err.message);
  }
     
}

 const updateContact = (contactId, body) => {
  newContact = validate(contactId)
  
  const newContacts = filteredContacts(contactId)
  
  if ( newContact) {    
     newContact.name = body.name
     newContact.email = body.email
     newContact.phone = body.phone
    newContacts.push( newContact )
    contacts = newContacts  
    saveFile(contacts)
    
  } else {   
    return false    
  }     
}

const changeContact = (contactId) => {

  
}

export { changeContact, listContacts, getById, removeContact, validate, addContact, updateContact }

