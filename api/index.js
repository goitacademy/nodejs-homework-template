const express = require('express');
const router = express.Router();

const contactsRouter = require('./contacts/contacts')
const usersRouter = require('./users/users');

router.use('/contacts', contactsRouter);
router.use('/users', usersRouter);

module.exports = router;