const {
    getAllContactsService,
    getOneContactService,
    postContactService,
    deleteContactService,
    putContactService,
} = require('../services/contactServices')

const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await getAllContactsService();
        res.json(contacts);
    } catch (error) {
        next(error);
    }
};

const getOneContact = async (req, res, next) => {
    try {
        const { contactID } = req.params;
        const contact = await getOneContactService(contactID);
        res.status(200).json(contact);
    } catch (error) {
        console.error('Error in getOneContact:', error);
        next(error);
    }
};

const postContact = async (req, res, next) => {
    try {
        const newContact = await postContactService(req.body);
        res.status(201).json(newContact);
    } catch (error) {
        next(error);
    }
};

const deleteContact = async (req, res, next) => {
    try {
        const { contactID } = req.params;
        const deleteContactID = await deleteContactService(contactID);
        res.status(200).json({ message: `Contact ${deleteContactID} has been deleted` });
    } catch (error) {
        next(error);
    } 
};

const putContact = async (req, res, next) => {
    try {
        const { contactID } = req.params;
        const putContact = await putContactService(contactID, req.body);
        res.status(200).json(putContact);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllContacts,
    getOneContact,
    postContact,
    deleteContact,
    putContact,
};
