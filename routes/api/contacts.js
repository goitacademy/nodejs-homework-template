const express = require('express');
const router = express.Router();
const controll =  require('../../controllers/contacts')





router.get('/', controll.getContact);

router.get('/:contactId', controll.getContactId);
  


router.post('/', controll.postContact);


router.delete('/:contactId', controll.delContact);

router.put('/:contactId', controll.putContact);


module.exports = router;
