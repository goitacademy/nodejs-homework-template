import { Router } from "express";
import { validateContact } from "../../validators/contacts/JoiSchema.js";

import * as controllers from "../../controllers/contacts/controllers.js";

const router = Router();

router.get("/", controllers.getContacts);
router.get("/:contactId", controllers.getContact);
router.post("/", validateContact, controllers.addContact);
router.delete("/:contactId", controllers.removeContact);

// router.put("/:contactId", async (req, res, next) => {
//   const { contactId } = req.params;
//   const result = schema.validate(req.body);
//   if (result.error) {
//     res.status(400).json({ message: "missing fields" }); // result.error.details[0].message // ZROBIONE WEDŁUG INSTRUKCJI ZADANIA
//   } else {
//     const { isOnList, contact } = await updateContact(contactId, result.value);
//     if (!isOnList) {
//       res.status(404).json({ message: "Not found" });
//     } else {
//       res.status(200).json(contact);
//     }
//   }
// });

export default router;
