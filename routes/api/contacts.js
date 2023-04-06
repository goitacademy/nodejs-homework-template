const express = require('express');
const router = express.Router();
const controll = require('../../controllers/contacts');

const validateBody = require('../../utils/validateBody');
const { addShema, updateShema } = require('../../schemas/contacts');




router.get('/', controll.getContact);

router.get('/:contactId', controll.getContactId);
  


router.post('/', validateBody(addShema), controll.postContact);


router.delete('/:contactId', controll.delContact);

router.put('/:contactId', validateBody(updateShema), controll.putContact);


module.exports = router;
