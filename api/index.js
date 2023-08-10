const express = require('express')
const router = express.Router()
const Contact = require('../service/schemas/contact.js')

router.get('/', async (req, res, next) => {
    try {
        const contacts = await Contact.find({}, "-createdAt -updatedAt");
        res.status(200).json(contacts);
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findById(id);
        console.log(contact);
        if (!contact) { return next(new Error("Contact not found.")) };
        res.status(200).json(contact);
    } catch (error) {
        next(error)
    }
})

router.post('/contacts', () => { })

router.put('/contacts/:id', () => { })

router.patch('/contacts/:id/status', () => { })

router.delete('/contacts/:id', () => { })

module.exports = router