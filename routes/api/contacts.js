const express = require('express')
const router = express.Router()

const {customAlphabet} = require('nanoid');
const nanoid = customAlphabet('1234567890', 2)


// const fs = require('fs/promises')

const {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
} = require('../../models/contacts')

router.get('/', async (req, res, next) => {
    const contacts = await listContacts()
    res.status(200).json({contacts, status: 'success'})
})

router.get('/:contactId', async (req, res, next) => {
    const id = req.params.contactId
    const [contact] = await getContactById(id)
    // console.log(contact);
    res.status(200).json({contact, status: 'success'})
})

router.post('/', async (req, res, next) => {
    const {name = '', email = '', phone = ''} = req.body
    console.log(name, email, phone);// todo: validation on empty fields
    let contact = req.body
    const id = nanoid(2).toString();
    contact = {"id": id, ...contact}
    console.log(contact);
    const result = await addContact(contact);
    res.json({result, status: 'success'})
})

router.delete('/:contactId', async (req, res, next) => {
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
})

router.put('/:contactId', async (req, res, next) => {
    const id = req.params.contactId;
    const body = req.body
    console.log(body);
    if (Object.keys(body).length === 0) {
        console.log('no body');
        return res.status(400).json({"message": "missing fields"})
    }
    const updatedContact = await updateContact(id, body)
    if (updatedContact) {
        res.status(200).json({"message": updatedContact})
    } else {
        res.status(404).json({"message": "Not found"})
    }
})

module.exports = router
