const express = require("express");
const router = express.Router();

const {
  getListContacts,
  getContactById,
  deleteContact,
  createContact,
  updateContact,
} = require("../../controllers/contactsControllers");

router.route("/").get(getListContacts).post(createContact);
router
  .route("/:contactId")
  .get(getContactById)
  .delete(deleteContact)
  .put(updateContact);

module.exports = router;

// router.get("/:contactId", async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const result = await contacts.getContactById(contactId);
//     if (!result) {
//       throw HttpError(404, "Not found");
//     }
//     res.json(result);
//   } catch (err) {
//     next(err);
//   }
// });

// router.post("/", async (req, res, next) => {
//   try {
//     const { error } = addSchema.validate(req.body);
//     if (error) {
//       throw HttpError(400, error.message);
//     }
//     const result = await contacts.addContact(req.body);
//     res.status(201).json(result);
//   } catch (err) {
//     next(err);
//   }
// });

// router.delete("/:contactId", async (req, res, next) => {
//   try {
//     const { contactId } = req.params;

//     const result = await contacts.removeContact(contactId);

//     if (!result) {
//       throw HttpError(404, "Not found");
//     }

//     res.status(200).json(result);
//   } catch (err) {
//     next(err);
//   }
// });

// router.put("/:contactId", async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const { error } = addSchema.validate(req.body);
//     if (error) {
//       throw HttpError(400, "missing fields");
//     }

//     const result = await contacts.updateContact(contactId, req.body);
//     if (!result) {
//       throw HttpError(404, "Not found");
//     }
//     res.status(200).json(result);
//   } catch (err) {
//     next(err);
//   }
// });
