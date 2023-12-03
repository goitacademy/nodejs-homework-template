const express = require('express');
const contactController = require('../../controllers/contacts');
const validate = require('../../middlewares/validate');
const errorWrapper = require('../../common/utils/errorWrapper');
const updateContactSchema = require('../../validationSchemas/updateContact');
const createContactSchema = require('../../validationSchemas/createContact');

const router = express.Router();

router.get('/', errorWrapper(contactController.listContacts));

router.get('/:contactId', errorWrapper(contactController.getContactById));

router.post(
	'/',
	validate(createContactSchema),
	errorWrapper(contactController.createContact)
);

router.delete('/:contactId', errorWrapper(contactController.deleteContact));

router.put(
	'/:contactId',
	validate(updateContactSchema),
	errorWrapper(contactController.updateContact)
);

router.patch(
	'/:contactId/favorite',
	errorWrapper(contactController.updateStatusContact)
);

module.exports = router;
