const express = require('express');

const contactController = require('../../controllers/contatcts-controller');

const router = express.Router();

router.get('/', contactController.getAllContacts);

router.get('/:contactId', contactController.getContatctById);

router.post('/', contactController.addContatct);

router.delete('/:contactId', contactController.deleteContatctById);

router.put('/:contactId', contactController.updateContatctById);

module.exports = router;
