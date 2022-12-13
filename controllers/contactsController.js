
const { Contact } = require('../db/contactModel')

const getContactsController = async (req, res) => { 
    const contacts = await Contact.find({});
    res.status(200).json({ data: contacts});
}

const getContactByIdController = async (req, res) => {
    const {contactId} = req.params
    const foundContact = await Contact.findById(String(contactId));
    if (foundContact) {
            return res.status(200).json({ data: foundContact });
        }
    return res.status(404).json({ message: "Not found" });
}

const addContactController = async (req, res ) => {
    const newContact = new Contact(req.body);
    await newContact.save();
    return res.status(201).json({ data: newContact });
}

const removeContactController = async (req, res) => {
    const {contactId} = req.params
    const deletedContact = await Contact.findByIdAndDelete(String(contactId));
    if (deletedContact) {
      return res.status(200).json({ message: "contact deleted" }); 
    }
    return res.status(404).json({ message: "Not found" });
}

const updateContactController = async (req, res) => {
    const {contactId} = req.params
    const { name, email, phone, favorite } = req.body
    const updatedContact = await Contact.findByIdAndUpdate(String(contactId), { name, email, phone, favorite }, { new: true });
    if (updatedContact) {
        return res.status(200).json({ data: updatedContact }); 
    }
    return res.status(404).json({ message: "Not found" });
}

const updateStatusContactController = async (req, res) => { 
    const { contactId } = req.params;
    const { favorite } = req.body
    const updatedContact = await Contact.findByIdAndUpdate(String(contactId), { $set: { favorite } }, { new: true })
    if (updatedContact) {
        return res.status(200).json({ data: updatedContact });
    }
    return res.status(404).json({ message: "Not found" });
}

module.exports = {
    getContactsController,
    getContactByIdController,
    addContactController,
    removeContactController,
    updateContactController,
    updateStatusContactController
}