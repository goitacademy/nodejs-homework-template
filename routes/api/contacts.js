const express = require('express')
const auth = require('../../auth')
const router = express.Router()
const {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
} = require('../../models/contacts')

router.get('/', auth, async (req, res, next) => {
    try {
        const contacts = await listContacts()
        return res.json({
            status: 'success',
            code: 200,
            data: { contacts },
        })
    } catch (err) {
        res.status(500).json(
            `An error occurred while getting the contact list: ${err}`
        )
    }
})

router.get('/:contactId', auth, async (req, res, next) => {
    try {
        const contact = await getContactById(req.params.contactId)
        return res.json({
            status: 'success',
            code: 200,
            data: { contact },
        })
    } catch (err) {
        res.status(500).json(`An error occurred: ${err}`)
    }
})

router.post('/', auth, async (req, res, next) => {
    try {
        const newContact = await addContact({
            ...req.body,
            owner: req.user._id,
        })
        return res.status(201).json({
            status: 'success',
            code: 201,
            data: { newContact },
        })
    } catch (err) {
        res.status(500).json(`An error occurred: ${err}`)
    }
})

router.delete('/:contactId', auth, async (req, res, next) => {
    try {
        await removeContact(req.params.contactId)
        return res.json({
            status: 'success',
            code: 200,
            message: 'Contact removed',
        })
    } catch (err) {
        res.status(500).json(`An error occurred: ${err}`)
    }
})

router.put('/:contactId', auth, async (req, res, next) => {
    try {
        const updatedContact = await updateContact(
            req.params.contactId,
            req.body
        )
        return res.json({
            status: 'success',
            code: 200,
            data: { updatedContact },
        })
    } catch (err) {
        res.status(500).json(`An error occurred: ${err}`)
    }
})

module.exports = router
