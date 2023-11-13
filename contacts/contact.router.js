const express = require('express');
const router = express.Router();
const {
    get,
    getById,
    create,
    update,
    updateStatus,
    remove
} = require('./contacts.controller');

router.get('/contacts', get);

router.get('/contacts/:id', getById);

router.post('/contacts', create);

router.put('/contacts/:id', update);

router.patch('/contacts/:id/favorite', updateStatus);

router.delete('/contacts/:id', remove);

module.exports = router;