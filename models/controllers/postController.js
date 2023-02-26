const {
    listContacts,
    listContactById,
    postContact,
    removeContact,
    updateContact,
    updateFavorite,
} = require("../contacts");

const getContacts = async (req, res, next) => {
    const contacts = await listContacts()
    res.status(200).json({contacts, status: 'success'})
};

const getContactById = async (req, res, next) => {
    const id = req.params.contactId
    const contact = await listContactById(id)
    if (!contact) {
        return res.status(404).json({"message": "Not found"})
    }
    res.status(200).json(contact)
};

const addContact = async (req, res, next) => {

    const contact = req.body
    const result = await postContact(contact);
    res.status(201).json({result})
};

const deleteContact = async (req, res, next) => {
    const id = req.params.contactId;
    const deleteResult = await removeContact(id);
    if (deleteResult.statusCode === 404) {
        return res.status(404).json(deleteResult)
    }
    if (deleteResult.statusCode === 200) {
        return res.status(200).json(deleteResult)
    }
};

const patchContact = async (req, res, next) => {
    const id = req.params.contactId;
    const body = req.body;
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({"message": "missing fields"})
    }

    const updatedContact = await updateContact(id, body);
    if (updatedContact) {
        res.status(200).json({"message": updatedContact})
    } else {
        res.status(404).json({"message": "Not found"})
    }
};

const updateFavoriteContact = async (req, res, next) => {
    const {contactId} = req.params;
    const body = req.body;
    const {favorite} = body;

    if (Object.keys(req.body).length === 0 || (!favorite)) {// todo: check is necessary
        console.log('no body with favorite parameter');
        return res.status(400).json({"message": "missing fields"})
    }

    const favoriteContact = await updateFavorite(contactId, body)
    if (favoriteContact) {
        res.status(200).json(favoriteContact)
    } else {
        res.status(404).json({"message": "Not found"})
    }
};

module.exports = {
    getContacts,
    getContactById,
    addContact,
    deleteContact,
    patchContact,
    updateFavoriteContact,
}