const mongoose = require("mongoose");
const Contact = require('../Schema/schema');
const BASE_URL = process.env.DATABASE_URI;

mongoose
  .connect(BASE_URL)
  .then(() => console.info("Database connection successful"))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

async function listContacts(req, res, next) {
    try {
        console.log('Before Contact.find()');
        const contacts = await Contact.find().exec();
        console.log('After Contact.find()');
        res.send(contacts)
    } catch (error) {
        console.error('Error in listContacts:', error); 
        next(error)
    }
}

async function getContactById(req, res, next) {
    const {contactId} = req.params;
    try {
        const contact = await Contact.findById(contactId).exec();
        console.log(contact);
      if(contact === null || contact === undefined){
        return res.status(404).send({ message: "Not found" })
      }
      
        res.send(contact)
    } catch (error) {
        next(error)
    }
}

async function removeContact(req, res, next){

}

async function addContact(req, res, next){

}

async function updateContact(req, res, next){
    
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
