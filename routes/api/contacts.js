const express = require('express');

const ctrl = require('../../controllers/');
const mdd = require('../../middlewares/');
const router = express.Router();

router.get('/', mdd.auth, mdd.params, ctrl.getAllContacts);

router.get('/:contactId', mdd.auth, mdd.id, ctrl.getContactById);

router.post('/', mdd.auth, mdd.contactBody, ctrl.addContact);

router.delete('/:contactId', mdd.auth, mdd.id, ctrl.deleteContact);

router.put('/:contactId', mdd.auth, mdd.id, mdd.contactBody, ctrl.updateContact);

router.patch('/:contactId/favorite', mdd.auth, mdd.id, mdd.favorite, ctrl.favoriteUpdate);

router.patch('/:id/favorite', ctrl.favoriteUpdate);

module.exports = router;
