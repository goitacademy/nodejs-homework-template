const {customAlphabet} = require('nanoid');
const nanoid = customAlphabet('1234567890', 3)

const {listContacts, listContactById, postContact, removeContact, updateContact} = require("../contacts");

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
    if (Object.keys(req.body).length > 3) {
        return res.status(400).json({"message": "only name, email and phone is required"})
    }
    const {name, email, phone} = req.body
    if (!name || !email || !phone) {
        return res.status(400).json({"message": "missing required name field"})
    }

    let contact = req.body
    const id = nanoid(2).toString();
    contact = {"id": id, ...contact}
    console.log(contact);
    const result = await postContact(contact);
    res.status(201).json({result})
}

const deleteContact = async (req, res, next) => {
    const id = req.params.contactId;
    const deleteResult = await removeContact(id);
    if (deleteResult.message === 'Not found') {
        return res.status(404).json(deleteResult)
    }
    ;
    if (deleteResult.message === 'contact deleted') {
        return res.status(200).json(deleteResult)
    }
    ;
}

const putContact = async (req, res, next) => {
    const id = req.params.contactId;
    const body = req.body;
    const {name, email, phone} = body
    // console.log(body);
    if (Object.keys(req.body).length === 0 || (!name && !email && !phone)) {
        console.log('no body');
        return res.status(400).json({"message": "missing fields"})
    }// todo: add checking to rite fields only



    const updatedContact = await updateContact(id, body)
    if (updatedContact) {
        res.status(200).json({"message": updatedContact})
    } else {
        res.status(404).json({"message": "Not found"})
    }
}


module.exports = {
    getContacts,
    getContactById,
    addContact,
    deleteContact,
    putContact,
}