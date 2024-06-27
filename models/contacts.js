const { log } = require("console");
const newid = require("../createId/createid")
const fs = require('fs/promises')
const path = require('path');
const consctPath = path.resolve('models/contacts.json')
const validar =require('../middleware/validar')

const db =require("../conexion-db/db")

const listContacts = async () => {
  //const list = await fs.readFile(consctPath)
  //return JSON.parse(list)
  const list = await db.find();
  return list;
}

const getContactById = async (contactId) => {
  let list= await listContacts();
  const listId =  list.find((x)=> x.id === contactId);
 
  return listId 
}

const removeContact = async (contactId) => {
  console.log(contactId);
  let list= await listContacts();
  const removelist =  list.findIndex((x)=> x.id === contactId);
  if(removelist != -1){
    //const [result]= list.splice(removelist,1);
    //await fs.writeFile(consctPath, JSON.stringify(list, null, 2))
    const result = await db.findByIdAndDelete({_id: contactId})
    return result
  }
  return null
}

const addContact = async (body) => {
  
  //const list= await listContacts();
  const newId = await newid();
  console.log(`nuevo id= ${newId}`) ;
   const nuecontac = {
    id: newId,
    name:body.name,
    email:body.email,
    phone:body.phone 
    /* ...body */
  } 

  await db.create(nuecontac)
 /*  list.push(nuecontac)
  await fs.writeFile(consctPath, JSON.stringify(list,null,2)); */
  return nuecontac
}

const updateContact = async (contactId, body) => {
  console.log(`id  ${contactId}    siguie el body `);
  let list= await listContacts();
  
  const removelist =  list.findIndex((x)=> x.id === contactId);
  if(removelist != -1){
    
    const list = await db.findByIdAndUpdate(contactId,
      {
        $set :{
          name:body.name,
          email:body.email,
          phone:body.phone,
          favorite:body.favorite
          }
        }
      )
     
  return true
}
return null

}



module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
