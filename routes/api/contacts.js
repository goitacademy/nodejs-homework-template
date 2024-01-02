const express = require('express');

const contactsController = require('../../controllers/contactsController');

const validate = require('../../middlewares/validate');
const { validationSchema } = require('../../schemas/schema');

const router = express.Router();

router.get('/', contactsController.listContacts);

router.get('/:contactId', contactsController.getContactById);

router.post('/', validate(validationSchema), contactsController.addNewContact);

router.delete('/:contactId', contactsController.deleteContactById);

router.put(
  '/:contactId',
  validate(validationSchema),
  contactsController.updateContact
);

module.exports = router;
