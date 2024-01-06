import express from "express";

import contactsControllers from "../../controllers/contacts-controllers.js";

import { isEmptyBody } from "../../middlewares/index.js";

const contactsRouter = express.Router();

contactsRouter.get('/', contactsControllers.getAll);
contactsRouter.get('/:id', contactsControllers.getById);
contactsRouter.post('/', isEmptyBody, contactsControllers.add);
contactsRouter.put('/:id', isEmptyBody, contactsControllers.updateById);
contactsRouter.delete('/:id', contactsControllers.deleteById);

export default contactsRouter;


// router.post('/', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.delete('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.put('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// module.exports = router
