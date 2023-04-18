const { getContactById, getListContacts, updateContact, removeContact, addContact, updateStatusContact } = require("../service/contacts");



const getContactsController = async (req, res, next) => {
    const contacts = await getListContacts();
    res.status(200).json(contacts);
};


const getContactDataByIdController = async (req, res, next) => {
    const  id = req.params.contactId;

    const contactDataById = await getContactById(id);
    if (!contactDataById) {
        return res.status(404).json({ "message": `Contact with id ${id} wasn't  found` });
    }

    res.status(200).json(contactDataById);
};


const addNewContactController = async (req, res, next) => {
    const newContact = await addContact(req.body);

    res.status(201).json(newContact);
};

const deleteContactByIdController = async (req, res, next) => {
    const id = req.params.contactId;
    
    const contactById = await getContactById(id);
    if (!contactById) {
        return res.status(404).json({ "message": `Contact with id ${id} wasn't  found` });
    }

    await removeContact(id);
    res.status(200).json({ "message": "contact deleted" });
};

const updateContactByIdController = async (req, res, next) => {

const updatedContact = await updateContact(req.params.contactId, req.body);
    if (!updatedContact) {
        res.status(404).json({ "message": `Contact with id ${req.params.contactId} wasn't  found` });

    }
    res.status(200).json(updatedContact);

};

const updateStatusContactController = async (req, res, next) => {
    const updatedStatusById = await updateStatusContact(req.params.contactId, req.body);
    if (!updatedStatusById) {
        res.status(404).json({ "message": `Contact with id ${req.params.contactId} wasn't  found` });

    }
    res.status(200).json(updatedStatusById);
}

module.exports = {
    getContactsController,
    getContactDataByIdController,
    addNewContactController,
    deleteContactByIdController,
    updateContactByIdController,
    updateStatusContactController,
}