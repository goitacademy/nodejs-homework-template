const ContactModel = require("../../models/contacts");

const getAllContacts = async (req, res, next) => {
    try {
        const allContacts = await ContactModel.find({});
        res.status(200).json({ message: "status 200", response: allContacts });
    } catch (error) {
        res.status(404).json({ message: `Contacts not found`, response: null });
    }
};

const getOneContact = async (req, res, next) => {
    try {
        const contactByID = await ContactModel.find({ _id: req.params.contactId });
        res.status(200).json({ message: "status 200", response: contactByID });
    } catch (error) {
        res.status(404).json({ message: `Contact ${req.params.contactId} not found`, response: null });
    }
};

const addContact = async (req, res, next) => {
    try {
        const contact = new ContactModel({ ...req.body });
        const newContact = await contact.save(contact);
        res.status(200).json({ message: "status 201", response: newContact });
    } catch (error) {
        res.status(404).json({ message: "Contact not created, i am sorry try again", response: null, error: error });
    }
};

const deletContact = async (req, res, next) => {
    try {
        const removeContact = await ContactModel.findByIdAndDelete({ _id: req.params.contactId });
        res.status(204).json({ message: "status 204", response: removeContact });
    } catch (error) {
        res.status(404).json({ message: `Contact ${req.params.contactId} not found`, response: null });
    }
};

const updateContact = async (req, res, next) => {
    try {
        const editContact = await ContactModel.findByIdAndUpdate({ _id: req.params.contactId }, req.body, {
            new: true,
        });
        res.status(200).json({ message: "status 200", response: editContact });
    } catch (error) {
        res.status(404).json({ message: `Contact ${req.params.contactId} not found`, response: null });
    }
};

const updateFavorite = async (req, res, next) => {
    try {
        const editContact = await ContactModel.findByIdAndUpdate({ _id: req.params.contactId }, req.body, {
            new: true,
        });
        res.status(200).json({ message: "status 200", response: editContact });
    } catch (error) {
        res.status(404).json({ message: `Contact ${req.params.contactId} not found`, response: null });
    }
};

module.exports = { getAllContacts, getOneContact, addContact, deletContact, updateContact, updateFavorite };
