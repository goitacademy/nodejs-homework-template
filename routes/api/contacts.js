const express = require("express");

const { contactSchema } = require("../../schemas");
const { controllerWrapper, validation } = require("../../middlewares");
const { contacts: ctrl } = require("../../controllers");

// const { contactSchema } = require("../../schemas");
// const contactsOperations = require("../../model");

const router = express.Router();

router.get("/", controllerWrapper(ctrl.listContacts));

// router.get("/", async (req, res, next) => {
//   try {
//     const contacts = await contactsOperations.listContacts();
//     res.json({
//       status: "success",
//       code: 200,
//       data: {
//         result: contacts,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }

// });

router.get("/:id", controllerWrapper(ctrl.getContactById));

// router.get("/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const result = await contactsOperations.getContactById(id);

//     if (!result) {
//       const error = new Error(`Id ${id} not found`);
//       error.status = 404;
//       throw error;
//     }

//     res.json({
//       status: "success",
//       code: 200,
//       data: {
//         result,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// ======
// });
// ======

router.post("/", validation(contactSchema), controllerWrapper(ctrl.addContact));

// router.post("/", async (req, res, next) => {
//   try {
//     const { error } = contactSchema.validate(req.body);
//     if (error) {
//       const err = new Error(error.message);
//       err.status = 400;
//       throw err;
//     }
//     const result = await contactsOperations.addContact(req.body);
//     res.status(201).json({
//       status: "success",
//       code: 201,
//       data: {
//         result,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// });

router.put(
  "/:id",
  validation(contactSchema),
  controllerWrapper(ctrl.updateContactById)
);

// router.put("/:id", async (req, res, next) => {
//   try {
//     const { error } = contactSchema.validate(req.body);
//     if (error) {
//       const err = new Error(error.message);
//       err.status = 400;
//       throw err;
//     }
//     const { id } = req.params;
//     const result = await contactsOperations.updateContactById(id, req.body);
//     if (!result) {
//       const error = new Error(`Id ${id} not found`);
//       error.status = 404;
//       throw error;
//     }
//     res.json({
//       status: "success",
//       code: 200,
//       data: {
//         result,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// });

router.delete("/:id", controllerWrapper(ctrl.removeContact));

// router.delete("/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const result = await contactsOperations.removeContact(id);
//     if (!result) {
//       const error = new Error(`Id ${id} not found`);
//       error.status = 404;
//       throw error;
//     }
//     res.json({
//       status: 'success',
//       code: 200,
//       message: 'Success delete'
//     })

//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
