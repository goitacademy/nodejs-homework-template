const contactsServices = require('../../services/contactsServices');
const contactsSchemas = require('../../schemas/contactsSchemas');
const RequestError = require('../../helpers/RequestError');

const listContacts = async (req, res) => {
    const contacts = await contactsServices.getAll();
    res.json(contacts);
};

const getContactById = async (req, res) => {
    const { contactId } = req.params;

    const contact = await contactsServices.getById(contactId);

    res.json(contact);
};

const addContact = async (req, res) => {
    const { error, value: contactData } = contactsSchemas.addContact.validate(
        req.body,
    );

    if (error) throw RequestError(400, error.details[0].message);

    const newContact = await contactsServices.createNew(contactData);

    res.status(201).json(newContact);
};

const removeContact = async (req, res) => {
    const { contactId } = req.params;

    await contactsServices.deleteById(contactId);

    res.json({ message: 'Contact deleted' });
};

const updateContact = async (req, res) => {
    const { contactId } = req.params;
    const { error, value: contactData } =
        contactsSchemas.updateContact.validate(req.body);

    if (error) throw RequestError(400, error.details[0].message);

    const updatedContact = await contactsServices.updateById(
        contactId,
        contactData,
    );

    res.json(updatedContact);
};

const updateFavorite = async (req, res) => {
    const { contactId } = req.params;

    const { error, value: favoriteUpdate } =
        contactsSchemas.updateFavorite.validate(req.body);

    if (error) throw RequestError(400, error.details[0].message);

    const updatedContact = await contactsServices.updateById(
        contactId,
        favoriteUpdate,
    );

    res.json(updatedContact);
};

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
    updateFavorite,
};
