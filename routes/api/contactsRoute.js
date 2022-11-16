const express = require('express');
const contactsControlers = require('../../models/contactsControlers');
const { userMiddlewares } = require('../../middleweras/userMiddlewares');
const { tryCatchWrapper } = require("../../helpers/index");

const contactsRouter = express.Router();

contactsRouter.use(userMiddlewares);
contactsRouter.get('/', tryCatchWrapper(contactsControlers.getAll));
contactsRouter.get('/:id', tryCatchWrapper(contactsControlers.findOneById));
contactsRouter.post('/', tryCatchWrapper(contactsControlers.create));
contactsRouter.delete('/:id', tryCatchWrapper(contactsControlers.deleteById));
contactsRouter.put('/:id', tryCatchWrapper(contactsControlers.updateById));
contactsRouter.patch("/:contactId/favorite", tryCatchWrapper(contactsControlers.updateStatusContact));

module.exports = {
  contactsRouter,
};
