const express = require("express");
const { validateBody } = require("../../middlewares");
const schemas = require("../../schemas/contacts");
const router = express.Router();
const ctrl = require("../../controllers/contacts");

router.get("/", ctrl.getAll);

// router.get("/", async (req, res, next) => {
//   try {
//     const result = await contacts.listContacts();
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// });
router.get("/:contactId", ctrl.getById);
// router.get("/:contactId", async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const result = await contacts.getContactById(contactId);
//     if (!result) {
//       throw HttpError(404, "Not found");
//     }
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// });
router.post("/", validateBody(schemas.addSchema), ctrl.add);
// router.post("/", async (req, res, next) => {
//   try {
//     const { error } = addSchema.validate(req.body);
//     if (error) {
//       throw HttpError(400, "missing required name field");
//     }

//     const result = await contacts.addContact(req.body);
//     res.status(201).json(result);
//   } catch (error) {
//     next(error);
//   }
// });
router.delete("/:contactId", ctrl.deleteById);
// router.delete("/:contactId", async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const result = await contacts.removeContact(contactId);
//     if (!result) {
//       throw HttpError(404, "Not found");
//     }
//     res.status(200).json({ message: "contact deleted" });
//   } catch (error) {
//     next(error);
//   }
// });
router.put(
  "/:contactId",
  validateBody(schemas.addSchema),
  ctrl.updateContactById
);
// router.put("/:contactId", async (req, res, next) => {
//   try {
//     const { error } = addSchema.validate(req.body);
//     if (error) {
//       throw HttpError(400, "missing fields");
//     }
//     const { contactId } = req.params;
//     const result = await contacts.updateContact(contactId, req.body);
//     if (!result) {
//       throw HttpError(404, "Not found");
//     }
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
