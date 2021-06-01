const express = require('express');
const router = express.Router();
const ctrl=require("../../../controllers/contacts")

const {
  validateCreateContact,
  validateUpdateContact,
  validateUpdateFavouriteContact,
} = require("./validation");


router.get('/', ctrl.listContacts);

router.get('/:id', ctrl.getById)

router.post('/', validateCreateContact, ctrl.create)

router.delete('/:id', ctrl.removeContact)

router.patch('/:id/favorite', validateUpdateFavouriteContact, ctrl.updateStatusContact)

router.put('/:id', validateUpdateContact, ctrl.update)


module.exports = router
