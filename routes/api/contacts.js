const express = require('express');
const isVailidId = require('../../middlewares/isValidId');

const router = express.Router();

const {
    getAll,
    getById,
    add,
    remove,
    uptade,
    updateFavorite,
} = require('../../controllers/contacts/index');

router.get('/', getAll);

router.get('/:contactId', isVailidId, getById);

router.post('/', add);

router.delete('/:contactId', isVailidId, remove);

router.put('/:contactId', isVailidId, uptade);

router.patch('/:contactId/favorite', isVailidId, updateFavorite);

module.exports = router;
