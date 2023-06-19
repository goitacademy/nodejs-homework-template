const express = require('express');
const ctrl = require("../../controllers/contacts");

const router = express.Router();

const { validateBody, isValidId } = require("../../middlewares");
const { addScheme, updateFavoriteScheme } = require("../../schemes");

router.get('/', ctrl.getAll);
router.get('/:contactId', isValidId, ctrl.getById);
router.post('/', validateBody(addScheme), ctrl.add);
router.put('/:contactId', isValidId, validateBody(addScheme), ctrl.update);
router.delete('/:contactId', isValidId, ctrl.remove);
router.patch('/:contactId/favorite', validateBody(updateFavoriteScheme), ctrl.patchFavorite);


module.exports = router;

