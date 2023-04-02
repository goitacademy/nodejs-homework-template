require("dotenv").config;
const express = require('express');

const ctrl = require('../../controllers/contacts');

const validateBody = require("../../utils/validateBody");
const isValidId = require("../../middlewares/isValidId");

const { addContactsSchema,
        // updateFavoriteSchema,
} = require("../../schemas/contacts");

const router = express.Router();


router.get('/', ctrl.getAll)

router.get('/:id', ctrl.getById);

router.post('/', validateBody(addContactsSchema), ctrl.add);

// router.delete('/:id', ctrl.removeContact);

// router.put('/:id', validateBody(schemas.addContactsSchema), ctrl.updateContact)
router.patch(
  "/:id/favorite",
  isValidId,
  // validateBody(updateFavoriteSchema),
  // ctrl.updateStatusContact
);

module.exports = router;