const express = require('express');
const ctrl = require("../../controllers/contacts");

const router = express.Router();

const { validateBody } = require("../../middlewares");
const { addScheme } = require("../../schemes");

router.get('/', ctrl.getAll);
router.get('/:contactId', ctrl.getById);
router.post('/', validateBody(addScheme), ctrl.add);
router.put('/:contactId', validateBody(addScheme), ctrl.update);
router.delete('/:contactId', ctrl.remove);


module.exports = router;
