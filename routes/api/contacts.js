/** @format */

const express = require('express');
const validateBody = require('../../middlewares');
const contactSchema = require('../../schemas');
const {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
} = require('../../controllers');
const { ctrlWrapper } = require('../../utils');

const router = express.Router();

router.get('/', ctrlWrapper(listContacts));

router.get('/:contactId', ctrlWrapper(getContactById));

router.post('/', validateBody(contactSchema), ctrlWrapper(addContact));

router.put('/:contactId', validateBody(contactSchema), ctrlWrapper(updateContact));

router.delete('/:contactId', ctrlWrapper(removeContact));

module.exports = router;
