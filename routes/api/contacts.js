const express = require("express");

const ctrl = require("../../controllers/contacts");

const { ctrlWrapper } = require("../../helpers");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

// router.get("/:contactId", async (req, res, next) => {
//   try {
//     const respond = await contactOperations.getContactById(
//       req.params.contactId
//     );
//     if (respond === null) {
//       next();
//     } else res.json(respond);
//   } catch (error) {
//     next(error);
//   }
// });

router.post("/", ctrlWrapper(ctrl.add));

router.delete("/:contactId", ctrlWrapper(ctrl.removeById));

router.put("/:contactId", ctrlWrapper(ctrl.updateById));

router.patch(
  "/:contactId/favorite",
  ctrlWrapper(ctrl.updateFavoriteStatusById)
);
// router.delete("/:contactId", async (req, res, next) => {
//   try {
//     const respond = await contactOperations.removeContact(req.params.contactId);
//     if (respond === []) {
//       next();
//     } else res.json(respond);
//   } catch (error) {
//     next(error);
//   }
// });

// router.put("/:contactId", async (req, res, next) => {
//   try {
//     const { error } = contactsSchema.validate(req.body);
//     if (error) {
//       error.status = 400;
//       throw error;
//     }
//     const respond = await contactOperations.updateContact(
//       req.params.contactId,
//       req.body
//     );
//     if (respond === null) next();
//     else res.json(respond);
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
