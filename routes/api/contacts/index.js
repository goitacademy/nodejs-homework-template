const express = require('express');
const router = express.Router();
const ctrl = require("../../../controllers/contacts");
const guard = require("../../../helpers/guard");

const {
  validateCreateContact,
  validateUpdateContact,
  validateUpdateFavouriteContact,
} = require("./validation");


router.get('/', guard, ctrl.listContacts);

router.get('/:id', guard, ctrl.getById)

router.post('/',  guard,validateCreateContact, ctrl.create)

router.delete('/:id', guard, ctrl.removeContact)

router.patch('/:id/favorite', guard, validateUpdateFavouriteContact, ctrl.updateStatusContact)

router.put('/:id', guard, validateUpdateContact, ctrl.update)


module.exports = router
