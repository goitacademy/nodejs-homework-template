const contactsRoutes = require('express').Router();
const contactController = require('../controllers/contacts.js');
const isValidId = require("../middlewares/isValidId");


contactsRoutes.get('/contacts', contactController.getAll);
contactsRoutes.get('/contacts/:contactId', isValidId, contactController.getById);
contactsRoutes.post('/contacts', contactController.add);
contactsRoutes.delete('/contacts/:contactId', isValidId, contactController.deleteById);
contactsRoutes.put('/contacts/:contactId', isValidId, contactController.updateById);
contactsRoutes.patch('/contacts/:contactId/favorite', isValidId, contactController.updateStatusContact);

module.exports = contactsRoutes;