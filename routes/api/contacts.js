const express = require('express');
const router = express.Router();
const { joiContactSchema } = require('../../schemas');
const { validation } = require('../../middleware');
const { ctrlWrapper } = require("../../helpers");
const ctrl = require('../../controllers/contacts')

router.get("/", ctrlWrapper(ctrl.listContacts));

// router.get('/', async (req, res, next) => {
//   try {
//     const result = await contacts.listContacts();
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// });

router.get("/:id", ctrlWrapper(ctrl.getContactById));

// router.get('/:id', async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const result = await contacts.getContactById(id);
//     if (!result) {
//       throw HttpError(404, "Not found");
//     }
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// });

router.post("/", validation(joiContactSchema), ctrlWrapper(ctrl.addContact));

// router.post('/', async (req, res, next) => {
//   try {
//     const { error } = validationSchema.validate(req.body);
//     if (error) {
//       throw HttpError(400, error.message);
//     }
//     const result = await contacts.addContact(req.body);
//     res.status(201).json(result);
//   } catch (error) {
//     next(error);
//   }
//   res.json({ message: 'template message' })
// });

router.put("/:id", validation(joiContactSchema), ctrlWrapper(ctrl.updateContact));

// router.put('/:id', async (req, res, next) => {
//   try {
//     const { error } = validationSchema.validate(req.body);
//     if (error) {
//       throw HttpError(400, error.message);
//     }
//     const { id } = req.params;
//     const result = await contacts.updateContact(id, req.body);
//     if (!result) {
//       throw HttpError(404, "Not found");
//     }
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
//   res.json({ message: 'template message' })
// });


router.delete("/:id", ctrlWrapper(ctrl.removeContact));

// router.delete('/:id', async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const result = await contacts.removeContact(id);
//     if (!result) {
//       throw HttpError(404, "Not found");
//     }
//     res.json({
//       message: "Delete success"
//     })
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
