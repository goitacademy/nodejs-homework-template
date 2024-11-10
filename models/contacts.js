const fs = require('fs/promises')
const { v4: uuidv4 } = require('uuid');
const Joi = require('joi');
const contactsPath = './models/db/contacts.json';


const schema = Joi.object({ 
  name: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),

  phone: Joi.string()
      .pattern(new RegExp('^[0-9]{9,11}$')),

  email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'pl','eu'] } })
})

const validation = ( name, email, phone)=>{

let validationStatus = false
const { error, value } = schema.validate({name, email, phone});
if(error === undefined) 
  validationStatus = true
return {validationStatus, error}
}

const readingFile = async () => {
  try{
    const buffor = await fs.readFile(contactsPath)
    const contacts = JSON.parse(buffor)
    return contacts
  } catch(err) {
    console.log(err)
  }

}
const updateFile = async (data) => {
  try{
    const fileData = JSON.stringify(data)
    fs.writeFile(contactsPath, fileData)
  } catch(err) {
    console.log(err)
  }

}

const listContacts = async () => {
  return readingFile().then((contacts)=> contacts)
}

const getContactById = async (contactId) => {
  return readingFile().then((contacts)=> contacts.filter(contact => contact.id===contactId))
}

const removeContact = async (contactId) => {
   return readingFile().then((contacts)=> {
            let removeDone = false
            const newContactList = contacts.filter(contact => contact.id!==contactId)
            
            if(contacts.length===newContactList.length) {
              return {removeDone}
            }
            removeDone = true
            updateFile(newContactList)
            return {removeDone}
          })
 
}

const addContact = async (name, email, phone) => {
  const newContact = {"id": uuidv4(), 
                      "name": name, 
                      "email": email, 
                      "phone": phone
                     }
  const validationResp = validation(name, email, phone)
  const validationPass = validationResp.validationStatus

  if(!validationPass){
    return validationResp.error.message
  }
  return readingFile().then((contacts)=> {
    const newContactsList = [...contacts, newContact]
    updateFile(newContactsList)
    return { validationPass, newContact}
    })
  
}
const updateContact = async (contactId, name, email, phone) => {
    
  const validationResp = validation(name, email, phone)
  const validationPass = validationResp.validationStatus
  if(!validationPass){
    const message = validationResp.error.message
    return {validationPass, message}
  }

  return readingFile().then((contacts)=> {
  let updatedDone = false
    const contactToUpdate = contacts.find(({id}) => id===contactId)

    if(contactToUpdate === undefined ) {
      return {validationPass, updatedDone}
    }

    const updatedContact ={...contactToUpdate, "name": name, "email": email, "phone": phone}
    const originContacts = contacts.filter(contact => contact.id!==contactId)
    const newContactList = [...originContacts,updatedContact]
    updateFile(newContactList)
    updatedDone = true

    return {validationPass, updatedDone, updatedContact}
  })


}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
