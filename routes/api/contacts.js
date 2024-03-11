const express = require('express');
const router = express.Router();
const { 
    listContacts, 
    getById, 
    addContact, 
    removeContact, 
    updateContact 
} = require('./models/contacts');

// GET /api/contacts
router.get('/', async (req, res) => {
    try {
        const contacts = await listContacts();
        res.status(200).json(contacts);
    } catch (error) {
        console.error('Error al obtener contactos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// GET /api/contacts/:id
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const contact = await getById(id);

        if (contact) {
            res.status(200).json(contact);
        } else {
            res.status(404).json({ message: "Not found" });
        }
    } catch (error) {
        console.error('Error al obtener contacto por ID:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// POST /api/contacts
router.post('/', async (req, res) => {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        return res.status(400).json({ message: "missing required name field" });
    }

    try {
        const newContact = await addContact({ name, email, phone });
        res.status(201).json(newContact);
    } catch (error) {
        console.error('Error al agregar contacto:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// DELETE /api/contacts/:id
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await removeContact(id);
        if (result) {
            res.status(200).json({ message: "contacto eliminado" });
        } else {
            res.status(404).json({ message: "Not found" });
        }
    } catch (error) {
        console.error('Error al eliminar contacto:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// PUT /api/contacts/:id
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    if (!name && !email && !phone) {
        return res.status(400).json({ message: "missing fields" });
    }

    try {
        const updatedContact = await updateContact(id, { name, email, phone });
        if (updatedContact) {
            res.status(200).json(updatedContact);
        } else {
            res.status(404).json({ message: "Not found" });
        }
    } catch (error) {
        console.error('Error al actualizar contacto:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

module.exports = router;

