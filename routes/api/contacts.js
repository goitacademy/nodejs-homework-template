const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../../middlewares/authMiddleware');
const { getContactsTest, createContact, getById, update, remove, } = require('../../controllers/contacts');

router.get('/', authMiddleware, getContactsTest);
router.post('/', authMiddleware, createContact);
router.put('/:id', authMiddleware, update);
router.delete('/:id', authMiddleware, remove);
router.get('/:id', authMiddleware, getById); 

module.exports = router;
