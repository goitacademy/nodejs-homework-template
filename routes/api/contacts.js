const express = require('express');
const {
  getAll,
  getById,
  add,
  remove,
  update
} = require("../../controllers/contacts")

const { validateBody } = require("../../middlewares");

const { addScheme } = require("../../schemes");

const router = express.Router();


router.get('/', getAll);
router.get('/:contactId', getById);
router.post('/', validateBody(addScheme), add);
router.put('/:contactId', validateBody(addScheme), update);
router.delete('/:contactId', remove);


module.exports = router;
