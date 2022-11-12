const mongoose = require("mongoose");
const {Contact} = require("../db/contactsMadal")
const { status, writeFileDB } = require("../helpers/status");

const listContacts = async (req, res, next) => {
 try {
  const result = await Contact.find({});
// delete console
  console.log(result);
  return status(res, 200, { status: "success" }, result);
 } catch (arror) {
  console.error("внешний блок catch", arror.message);
 }
};

const getContactById = async (req, res, next) => {
 try {
  const result = await Contact.find({});
  const [contact] = result.filter((item) => item.id === req.params.contactId);
  if (contact) {
   return status(res, 200, { status: "success" }, contact);
  } else {
   return status(res, 200, { status: "error", message: "Not found" }, contact);
  }
 } catch (error) {
  console.error(error);
 }
};

const removeContact = async (req, res, next) => {
//  try {
    // await Contact.
    // deleteOne($set: { name: 'Alec Howard'})
    
//   const result = await Contact.find({});
//   const resultFilter = result.filter(
//    (item) => item.id !== req.params.contactId
//   );
//   if (resultFilter) {  
//     await Contact.deleteOne({id: req.params.contactId})
//    return status(res, 200, { message: "contact deleted" });
//   } else {
//    return status(res, 404, { message: "Not found" });
//   }
//  } catch (error) {
//   console.error(error);
//  }
};

const addContact = async (req, res, next) => {
 try {
  const { name, email, phone } = req.body;

const contact = new Contact({name, email, phone, createdAt: Date.now()})
await contact.save();
 

  return status(res, 201, { status: "success" }, contact);
 } catch (error) {
  console.error(error);
 }
};

const updateContact = async (req, res, next) => {
 try {

    Contact.updateOne({ _id: req.params.contactId }, { $set: { email: 'AVENUE@Q.COM' } }); 
   
//   const result = await Contact.find({}); 
//   const { name, email, phone } = req.body;

//   result.forEach((contact) => {
//     resultFilter = contact.id === req.params.contactId
   
//    const res =  await Contact.updateOne({ name }, { email },{phone });
    
   
//   });


//   return status(res, 200, { status: "success", result });
 } catch (error) {
  console.error(error);
 }
};

module.exports = {
 listContacts,
 getContactById,
 removeContact,
 addContact,
 updateContact,
};
