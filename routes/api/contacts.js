const express = require('express');
const controllers= require('../../controllers/index')
const router = express.Router();

// Obtener la lista de contactos
router.get('/',controllers.listContacts);

// Obtener un contacto por su ID
router.get('/:contactId', controllers.getContactById);

// Agregar un nuevo contacto
router.post('/', controllers.addContact);

// Eliminar un contacto por su ID
router.delete('/:contactId', controllers.removeContact);

// Actualizar un contacto por su ID
router.put('/:contactId', controllers.updateContact);

module.exports = router;
