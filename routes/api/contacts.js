const express = require("express");

const ctrl = require("../../controllers/contacts");

const { ctrlWrapper } = require("../../helpers");

const { auth, validation, validationId } = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.getAll));

router.get("/:id", validationId, ctrlWrapper(ctrl.getById));

router.post("/", auth, ctrlWrapper(ctrl.add));

router.put(
  "/:id",
  validationId,
  validation(schemas.add),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:id/favorite",
  validationId,
  validation(schemas.updateFavorite),
  ctrlWrapper(ctrl.updateFavorite)
);

router.delete("/:id", validationId, ctrlWrapper(ctrl.removeById));

module.exports = router;

// const express = require("express");
// const { isValidObjectId, Schema } = require("mongoose");

// const { createError } = require("../../helpers");

// const { Contact, schemas } = require("../../models/contact");

// const { auth } = require("../../middlewares");

// const router = express.Router();

// router.get("/", auth, async (req, res, next) => {
//   const { _id } = req.user;
//   const { page = 1, limit = 20 } = req.query;
//   const skip = (page - 1) * limit;
//   try {
//     const result = await Contact.find({ owner: _id }, "-createdAt -updatedAt", {
//       skip,
//       limit: Number(limit),
//     }).populate("owner", "email");
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// });

// router.get("/:id", auth, async (req, res, next) => {
//   const { _id: owner } = req.user;
//   try {
//     const { id } = req.params;
//     const isValid = isValidObjectId(id);
//     if (!isValid) {
//       throw createError(404);
//     }
//     const result = await Contact.findOne(
//       { _id: id, owner },
//       "-createdAt -updatedAt"
//     );
//     if (!result) {
//       throw createError(404);
//     }
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// });

// router.post("/", auth, async (req, res, next) => {
//   const { _id } = req.user;
//   try {
//     const { error } = schemas.add.validate(req.body);
//     if (error) {
//       throw createError(400, error.message);
//     }

//     const result = await Contact.create({ ...req.body, owner: _id });
//     res.status(201).json(result);
//   } catch (error) {
//     next(error);
//   }
// });

// router.put("/:id", auth, async (req, res, next) => {
//   try {
//     const { error } = schemas.add.validate(req.body);
//     if (error) {
//       throw createError(400, error.message);
//     }
//     const { id } = req.params;
//     const isValid = isValidObjectId(id);
//     if (!isValid) {
//       throw createError(404);
//     }
//     const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
//     if (!result) {
//       throw createError(404);
//     }
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// });

// router.patch("/:id/favorite", auth, async (req, res, next) => {
//   try {
//     const { error } = schemas.updateFavorite.validate(req.body);
//     if (error) {
//       throw createError(400, error.message);
//     }
//     const { id } = req.params;
//     const isValid = isValidObjectId(id);
//     if (!isValid) {
//       throw createError(404);
//     }
//     const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
//     if (!result) {
//       throw createError(404);
//     }
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// });

// router.delete("/:id", auth, async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const isValid = isValidObjectId(id);
//     if (!isValid) {
//       throw createError(404);
//     }
//     const result = await Contact.findByIdAndRemove(id);
//     if (!result) {
//       throw createError(404);
//     }
//     res.json({
//       message: "contact deleted",
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// module.exports = router;
