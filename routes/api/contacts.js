const express = require('express');

const router = express.Router();

const {
    getAll,
    getById,
    add,
    remove,
    uptade,
} = require('../../controllers/contacts/index');

router.get('/', getAll);

router.get('/:contactId', getById);

router.post('/', add);

router.delete('/:contactId', remove);

router.put('/:contactId', uptade);

module.exports = router;
