const express = require("express");
const controllers = require("../../controllers/contacts");
const ctrlWrapper = require('../../helpers/ctrlWrapper');
const {validateBody} = require('../../helpers');
const schemas = require('../../schemas/contactSchema')

const router = express.Router();

router.get('/', ctrlWrapper(controllers.listContacts));

router.get('/:contactId', ctrlWrapper(controllers.getContactById));

router.post('/', validateBody(schemas.addSchema), ctrlWrapper(controllers.addContact));

router.put(
  '/:contactId',
  validateBody(schemas.addSchema),
  ctrlWrapper(controllers.updateContact)
);

router.delete('/:contactId', ctrlWrapper(controllers.removeContact));

router.patch(
  '/:contactId/favorite',
  validateBody(schemas.addSchema),
  ctrlWrapper(controllers.updateStatusContact)
);




// router.get("/", async (req, res, next) => {
//   try {
//     const result = await contacts.listContacts();
//     res.status(200).json(result);
//   } catch (error) {
//     next(error);
//   }
// });

// router.get("/:contactId", async (req, res, next) => {
//   try {
//     const result = await contacts.getContactById(req.params.contactId);
//     if (!result) throw Error;
//     res.status(200).json(result);
//   } catch (error) {
//     next(res.status(404).json({ message: "Contact not found" }));
//   }
// });

// router.post("/", async (req, res, next) => {
//   try {
//     const { error } = addSchema.validate(req.body);
//     if (error) throw Error(error);
//     const result = await contacts.addContact(req.body);
//     res.status(201).json(result)
//   } catch (error) {
//     next(
//       res.status(400).json({ message: error.message })
//     );
//   }
// });

// router.delete("/:contactId", async (req, res, next) => {
// try {
//   const result = await contacts.removeContact(req.params.contactId);
//   if (!result) throw Error;
//   res.status(200).json({message: "Contact deleted"});
// } catch (error) {
//   next(res.status(404).json({ message: "Contact not found" }));
// }
// });

// router.put("/:contactId", async (req, res, next) => {
//   try {
//     const { error } = addSchema.validate(req.body);
//     if (error) throw Error(error);
//     const result = await contacts.updateContact(req.params.contactId, req.body);
//     if (result === null) {
//     res.status(404).json({message: 'Not found'});
//     };
//     res.status(200).json(result);
//   } catch (error) {
//     next(res.status(400).json({ message: error.message }));
//   }
// });

module.exports = router;
