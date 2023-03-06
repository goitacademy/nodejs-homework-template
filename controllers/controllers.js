const contactsModel = require('../models/contacts')

const getContacts = async (req, res) => {
    const contacts = await contactsModel.listContacts();
    res.status(200).json(contacts);
}

const getContact = async (req, res) => {
    const { contactId } = req.params;
    console.log(contactId);
    const contact = await contactsModel.getContactById(contactId);
    console.log(contact)
    contact.length ? res.status(200).json(contact) : res.status(404).json("Not found!") 
};
const createContact = async (req, res) => {
    const { name, email, phone } = req.body;
    const id =  await contactsModel.addContact(name, email, phone);
    res.status(201).json(await contactsModel.getContactById(id))
  };
  const deleteContact =  async (req, res) => {
    const { contactId } = req.params;
    const isSuccess = await contactsModel.removeContact(contactId);
    isSuccess ? res.status(200).json("Contact deleted") : res.status(404).json("Not found!")
  };
const updateContact =async (req, res) => {
    const { contactId } = req.params;
    if (Object.keys(req.body).length === 0) {
      res.status(400).json("Missing fields");
      return;
    }
   const updatedContact = await contactsModel.updateContact(contactId, req.body)
   updatedContact ? res.status(200).json(await contactsModel.getContactById(contactId)) : res.status(404).json("Not found!")
  };

  module.exports={getContacts, getContact, createContact, deleteContact, updateContact}