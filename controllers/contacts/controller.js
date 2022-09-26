const contactsServices = require('../../services/contactsServices');
const contactsSchemas = require('../../schemas/contactsSchemas');
const RequestError = require('../../helpers/RequestError');

const listContacts = async (req, res) => {
    const { id } = req.user;
    const { page = 1, limit = 10, favorite } = req.query;
    const contacts = await contactsServices.getAll(id, page, limit, favorite);
    res.json(contacts);
};

const getContactById = async (req, res) => {
    const { contactId } = req.params;

    const contact = await contactsServices.getById(contactId);

    res.json(contact);
};

const addContact = async (req, res) => {
    const { id } = req.user;
    const { error, value: contactData } = contactsSchemas.addContact.validate(
        req.body,
    );

    if (error) throw RequestError(400, error.details[0].message);

    const newContact = await contactsServices.createNew(contactData, id);

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
