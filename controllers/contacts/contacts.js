const contactModel = require("../../models/contacts");

const getAllContacts = async (req, res, next) => {
    try {
        const allContacts = await contactModel.find({});
        res.status(200).json({ message: "status 200", response: allContacts });
    } catch (error) {
        res.status(404).json({ message: `Contacts not found`, response: null });
    }
};

const getOneContact = async (req, res, next) => {
    try {
        const contactByID = await contactModel.find({ _id: req.params.contactId });
        res.status(200).json({ message: "status 200", response: contactByID });
    } catch (error) {
        res.status(404).json({ message: `Contact ${req.params.contactId} not found`, response: null });
    }
};

const addContact = async (req, res, next) => {
    try {
        const { name, email, phone, favorite } = req.body;
        const newContact = await contactModel.addContact({ name, email, phone, favorite });
        res.status(200).json({ message: "status 201", response: newContact });
    } catch (error) {
        res.status(404).json({ message: "Contact not created, i am sorry try again", response: null });
    }
};

const deletContact = async (req, res, next) => {
    try {
        const removeContact = await contactModel.findByIdAndDelete({ _id: req.params.contactId });
        res.status(204).json({ message: "status 204", response: removeContact });
    } catch (error) {
        res.status(404).json({ message: `Contact ${req.params.contactId} not found`, response: null });
    }
};

const updateContact = async (req, res, next) => {
    try {
        const editContact = await contactModel.findByIdAndUpdate({ _id: req.params.contactId }, req.body);
        res.status(200).json({ message: "status 200", response: editContact });
    } catch (error) {
        res.status(404).json({ message: `Contact ${req.params.contactId} not found`, response: null });
    }
};

module.exports = { getAllContacts, getOneContact, addContact, deletContact, updateContact };
