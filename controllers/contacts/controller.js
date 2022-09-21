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

    if (!contact) throw RequestError(404, 'Not found');

    res.json(contact);
};

const addContact = async (req, res) => {
    const { error, value: contactData } = contactsSchemas.addContact.validate(
        req.body,
    );
    const { favorite = false } = req.body;

    if (error) throw RequestError(400, error.details[0].message);

    const newContact = await contactsServices.createNew({
        ...contactData,
        favorite,
    });

    res.status(201).json(newContact);
};

const removeContact = async (req, res) => {
    const { contactId } = req.params;

    const status = await contactsServices.deleteById(contactId);

    if (!status) throw RequestError(404, 'Not found');

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

    return updatedContact
        ? res.json(updatedContact)
        : res.status(404).json({ message: 'Not found' });
};

const updateFavorite = async (req, res) => {
    const { contactId } = req.params;
    const { favorite } = req.body;
    if (!favorite)
        return res.status(400).json({ message: 'missing field favorite' });

    const updatedContact = await contactsServices.updateStatus(
        contactId,
        favorite,
    );

    return updatedContact
        ? res.json(updatedContact)
        : res.status(404).json({ message: 'Not found' });
};

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
    updateFavorite,
};
