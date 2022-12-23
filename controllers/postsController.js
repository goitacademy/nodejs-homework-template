const contacts = require('../models/contacts');

const getPosts = async (req, res, next) => {
    const result = await contacts.listContacts();
    res.status(200).json(result)
}

const getPostsById = async (req, res, next) => {
    const id = req.params.contactId;
    const result = await contacts.getContactById(id);
    if (result === null) {
        return res.status(404).json({ message: "Not found" })
    }
    res.json(result)
}

const addPosts = async (req, res, next) => {
    const { name, email, phone } = req.body;
    const result = await contacts.addContact({ name, email, phone })
    res.status(201).json(result)
}

const deletePosts = async (req, res, next) => {
    const id = req.params.contactId;

    const result = await contacts.removeContact(id);
    if (!result) {
        return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ message: "contact deleted" })

}

const updatePostsById = async (req, res, next) => {
    const id = req.params.contactId;

    const { name, email, phone } = req.body;
    const result = await contacts.updateContact(id, { name, email, phone });
    res.status(200).json(result);
}

module.exports = {
    getPosts,
    getPostsById,
    addPosts,
    deletePosts,
    updatePostsById
}