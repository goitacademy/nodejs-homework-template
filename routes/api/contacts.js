const express = require('express')
const {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
    updateStatusContact,
} = require('../../models/contacts')

const router = express.Router()

// Pobieranie listy wszystkich kontaktów
router.get('/', async (req, res, next) => {
    try {
        const contacts = await listContacts()
        return res.json({
            status: 'success',
            code: 200,
            data: { contacts },
        })
    } catch (err) {
        next(err)
    }
})

// Pobieranie jednego kontaktu
router.get('/:contactId', async (req, res, next) => {
    try {
        const { contactId } = req.params
        const contact = await getContactById(contactId)
        if (!contact) {
            return res.status(404).json({ message: 'Not found' })
        }
        res.json(contact)
    } catch (err) {
        next(err)
    }
})

// Dodanie nowego kontaktu
router.post('/', async (req, res, next) => {
    try {
        const newContact = await addContact(req.body)
        res.status(201).json(newContact)
    } catch (err) {
        next(err)
    }
})

// Usuwanie kontaktu
router.delete('/:contactId', async (req, res, next) => {
    try {
        const { contactId } = req.params
        const deletedContact = await removeContact(contactId)
        if (!deletedContact) {
            return res.status(404).json({ message: 'Not found' })
        }
        res.status(204).end()
    } catch (err) {
        next(err)
    }
})

// Aktualizowanie istniejącego kontaktu
router.put('/:contactId', async (req, res, next) => {
    try {
        const { contactId } = req.params
        const updatedContact = await updateContact(contactId, req.body)
        if (!updatedContact) {
            return res.status(404).json({ message: 'Not found' })
        }
        res.json(updatedContact)
    } catch (err) {
        next(err)
    }
})

// Aktualizowanie pola 'favorite' w istniejącym kontakcie
router.patch('/:contactId/favorite', async (req, res, next) => {
    try {
        const { contactId } = req.params
        const { favorite } = req.body
        if (favorite === undefined) {
            return res.status(400).json({ message: 'missing field favorite' })
        }
        const updatedContact = await updateStatusContact(contactId, {
            favorite,
        })
        if (!updatedContact) {
            return res.status(404).json({ message: 'Not found' })
        }
        res.json(updatedContact)
    } catch (err) {
        next(err)
    }
})

module.exports = router
