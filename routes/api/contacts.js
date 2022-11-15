const { Router } = require('express');

const contactsController = require('../../controllers/contactsController');

const validationBody = require('../../middlewares/validationBody');

const {
    schemaPostContact,
    schemaPutContact
} = require('../../schemes/schemes');


const router = Router()

router.get('/', contactsController.getContacts);
router.get('/:id', contactsController.getContactById);
router.post('/', validationBody(schemaPostContact), contactsController.postContact);
router.put('/:id', validationBody(schemaPutContact), contactsController.putContact);
router.delete('/:id', contactsController.deleteContact);


module.exports = router;
