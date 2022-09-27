const express = require('express');

const router = express.Router();
console.log('hello');

/**
 * our functions which one is responsible for operations with data depending on the route
 */
const ctrl = require('../../controlers/contacts');

/** in this wrapper  I took out try catch.  */
const { ctrlWrapper } = require('../../helpers');

/** in this function I took out validation body of request */
const { validateBody } = require('../../middlewares');

/** validation body of request */
const schema = require('../../schema/contactSchema');

router.get('/', ctrlWrapper(ctrl.getAllContacts));

router.get('/:contactId', ctrlWrapper(ctrl.getContactById));

router.post(
  '/',
  validateBody(schema.contactsAddSchema),
  ctrlWrapper(ctrl.addContacts)
);

router.delete('/:contactId', ctrlWrapper(ctrl.deleteContact));

router.put(
  '/:contactId',
  validateBody(schema.contactsAddSchema),
  ctrlWrapper(ctrl.updateContact)
);

module.exports = router;

// const contacts = require('../../models/contacts');
// router.get('/:contactId', async (req, res, next) => {
//   try {
//     console.log(req.params);
//     const { contactId } = req.params;
//     const result = await contacts.getContactById(contactId);
//     if (!result) {
//       throw RequestError(404, 'Not found');
//     }
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// });

// router.get('/', async (req, res, next) => {
//   try {
//     const result = await contacts.listContacts();
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// });
