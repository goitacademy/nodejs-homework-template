const express = require('express');
const router = express.Router();

// Importa las funciones de los controladores desde donde estén definidas
const contactsController = require('../../Controllers/contactsController'); // Reemplaza con la ruta correcta

// Define las rutas utilizando las funciones del controlador
router.get('/', contactsController.listContacts);
router.get('/:id', contactsController.getContactById);
router.post('/', contactsController.addContact);
router.delete('/:id', contactsController.removeContact);
router.put('/:id', contactsController.updateContact);

module.exports = router;
