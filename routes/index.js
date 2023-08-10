const express = require('express')
const router = express.Router()
const Contact = require('../models/contact.js')

router.get('/', async (req, res, next) => {
    try {
        const contacts = await Contact.find({}, "-createdAt -updatedAt");
        console.log(contacts)
        res.status(200).json(
            {
                status: "success",
                data: contacts,
            });
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findById(id);
        if (!contact) {
            throw new Error('Contact not found.')
        }
        res.status(200).json(
            {
                status: "success",
                data: contact,
            });
    } catch (error) {
        res.status(400).json({
            status: "error",
            data: {
                message: error.message,
            }
        })
    }
})

router.post('/contacts', () => { })

router.put('/contacts/:id', () => { })

router.patch('/contacts/:id/status', () => { })

router.delete('/contacts/:id', () => { })

module.exports = router