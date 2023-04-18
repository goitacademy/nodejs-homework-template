const express = require('express')

const router = express.Router();

const ctrl = require("../../controllers/contacts")

const validateBody = require("../../middlewares/validateBody")

const schema  = require("../../schemas");

const {isValidId} = require("../../middlewares");


router.get('/', ctrl.getAll );

router.get('/:contactId',isValidId,ctrl.getContact);

router.post('/',validateBody(schema.addSchema), ctrl.addContact);

router.delete('/:contactId', isValidId, ctrl.deleteContact);

router.put('/:contactId', isValidId, validateBody(schema.updateSchema), ctrl.updateContact );
router.patch('/:contactId/favorite', isValidId, validateBody(schema.updateFavoriteSchema), ctrl.updateFavorite );

module.exports = router;
