const fs = require('fs').promises;
const path = require('path');

const Joi = require('joi');
const schema = Joi.object({
  name: Joi.string()
  .alphanum()
  .min(3)
  .max(30)
  .required(),

  email: Joi.string()
  .min(3)
  .max(30)
  .required(),

  phone: Joi.string()
  .min(3)
  .max(30)
  .required(),
})

const contactsPath = path.join(__dirname, "./contacts.json")

const listContacts = async () => {
  try{
    const data = await fs.readFile(contactsPath, "utf-8")
    return JSON.parse(data)
  }catch(error){
    console.log(error.message)
  }
  }

const getContactById = async (contactId) => {
  try{
    const jsonData = await fs.readFile(contactsPath, "utf-8")
    const data = JSON.parse(jsonData)
    const ourContact = data.find(contact => contact.id === contactId)

    return ourContact
  }catch(error){
    console.log(error.message)
  }

}

const removeContact = async (contactId) => {
  try{
  const jsonData = await fs.readFile(contactsPath, "utf-8")
  const data = JSON.parse(jsonData)
  const deleteContact = data.find(contact => contact.id === contactId)
  if(!deleteContact){
    return false
  }
  const deleteIndex = data.indexOf(deleteContact)
        data.splice(deleteIndex, 1)
  fs.writeFile(contactsPath, JSON.stringify(data))
  return true}
  catch(error){
    console.log(error.message)
  }
}

const addContact = async (body) => {
  try{
    schema.validate(body)
    const {name, email, phone} = body

    if(!name){
      return false
    }
    if(!email){
      return false
    }
    if(!phone){
      return false
    }
    const jsonData = await fs.readFile(contactsPath, "utf-8")
    const data = JSON.parse(jsonData)
    const lastIndex = data.length-1
    const lastId = JSON.parse(data[lastIndex].id)
    data.push(
      {
          id: `${lastId+1}`,
          name,
          email,
          phone
      })
      fs.writeFile(contactsPath, JSON.stringify(data))
      return data
  }catch(error){
    console.log(error.message)
  }
}

const updateContact = async (contactId, body) => {
  try{
    if(!body){
      return "no body"
    }
    if(Object.keys(body).length === 0){
      return "no body"
    }
  
    const {name, email, phone} = body
    const jsonData = await fs.readFile(contactsPath, "utf-8")
    const data = JSON.parse(jsonData)
    const ourContact = data.find(contact => contact.id === contactId)
    if(!ourContact){
      return false
    }
    if(name){
      ourContact.name=name
    }
    if(email){
      ourContact.email=email
    }
    if(phone){
      ourContact.phone=phone
    }
    const updateIndex = data.indexOf(ourContact)
    data.splice(updateIndex, 1, ourContact)
    fs.writeFile(contactsPath, JSON.stringify(data))
    return ourContact
  }catch(error){
    console.log(error.message)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
