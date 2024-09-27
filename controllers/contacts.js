const contacts = require("../models/contacts");

const { HttpError, ctrlWrapper } = require("../utils");



// Функція яка обробляє запит GET для отримання списку всіх контактів.

const listContacts = async (req, res) => {

    const result = await contacts.listContacts();
    res.json(result)
}

// Функція яка обробляє запит GET для отримання контакту за ідентифікатором

const getContactById = async (req, res) => {

    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
        throw HttpError(404, "Not Found");
    }
    res.json(result)



}

// Функція яка обробляє запит POST для додавання нового контакту.

const addContact = async (req, res) => {

    const result = await contacts.addContact(req.body);
    if (!result) {
        throw HttpError(404, "Not Found");
    }
    res.status(201).json(result);

}

// Функція яка обробляє запит PUT для зміни контакту за ідентифікатором

const changeContact = async (req, res) => {

    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
        throw HttpError(404, "Not Found");
    }
    res.json(result);
}

// Функція яка обробляє запит DELETE для видалення контакту за ідентифікатором

const removeContact = async (req, res) => {

    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
        throw HttpError(404, "Not Found");
    }
    res.json({
        message: "Delete Contact"
    })
}



module.exports = {
    listContacts: ctrlWrapper(listContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    changeContact: ctrlWrapper(changeContact),
    removeContact: ctrlWrapper(removeContact),
};