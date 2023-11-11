const { Contact } = require("../models/contacts");

async function getAllContacts(req, res) {
    const { id: owner } = req.user;
    const { page = 1, limit = 20, favorite, name, email } = req.query;
    const skip = (page - 1) * limit;

    const query = { owner };

    if (favorite !== undefined) {
        query.favorite = favorite;
    }

    if (name) {
        query.name = name;
    }

    if (email) {
        query.email = email;
    }

    const allContacts = await Contact.find(query)
        .limit(Number(limit))
        .skip(Number(skip));

    res.status(200).json(allContacts);
}

async function getContactById(req, res) {
    const { contactId } = req.params;
    const { id: owner } = req.user;

    const contactById = await Contact.findOne({ _id: contactId, owner });

    if (!contactById) {
        return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(contactById);
}

async function addContact(req, res) {
    const { name, email, phone } = req.body;
    const { id: owner } = req.user;
    const newContact = await Contact.create({ name, email, phone, owner });
    console.log("NewContact", newContact);

    res.status(201).json(newContact);
}

async function removeContact(req, res) {
    const { contactId } = req.params;
    const { id: owner } = req.user;

    const remove = await Contact.findOneAndRemove({ _id: contactId, owner });

    if (!remove) {
        return res.status(404).json({ message: "Not found" });
    }

    return res.status(200).json({ message: "Contact deleted" });
}

async function updateContact(req, res) {
    const { contactId } = req.params;
    const { id: owner } = req.user;

    const upContact = await Contact.findOneAndUpdate(
        { _id: contactId, owner },
        req.body,
        { new: true }
    );

    if (!upContact) {
        return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(upContact);
}

async function updateStatusContact(req, res) {
    const { contactId } = req.params;
    const { id: owner } = req.user;

    const upContact = await Contact.findOneAndUpdate(
        { _id: contactId, owner },
        req.body,
        { new: true }
    );

    if (!upContact) {
        return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(upContact);
}

module.exports = {
    getAllContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
    updateStatusContact,
};