const express = require("express");


const {
  getAll,
  getById,
  addById,
  deleteById,
  updateById,
} = require('../../controllers/contactsController');

const {contactValidation} = require('../../middlewares/validation');

const router = express.Router();

router.get('/', getAll)

router.get('/:contactId', getById) 

router.post('/', contactValidation, addById) 

router.delete('/:contactId', deleteById)

router.put('/:contactId',contactValidation, updateById)


// router.get("/", async (req, res, next) => {
//   const response = await listContacts();
//   res.json({ status: 200, response });
// });

// router.get("/:contactId", async (req, res, next) => {
//   const response = await getContactById(req.params.contactId);

//   response === null
//     ? res.json({ status: 404, message: "Not found" })
//     : res.json({ status: 200, response });
// });

// router.post("/", async (req, res, next) => {
//   const { name, email, phone } = req.body;

//   if (!name || !email || !phone)
//     return res.json({ status: 400, message: "missing required name field" });

//   const validationResult = validateInput({ name, email, phone });
//   if (validationResult.error === undefined) {
//     const response = await addContact({ name, email, phone });

//     return res.json({ status: 201, response });
//   }

//   res.json({ status: 400, error: validationResult.error });
// });

// router.delete("/:contactId", async (req, res, next) => {
//   const response = await removeContact(req.params.contactId);

//   response === null
//     ? res.json({ status: 404, message: "Not found" })
//     : res.json({ status: 200, response });
// });

// router.put("/:contactId", async (req, res, next) => {
//   const id = req.params.contactId;
//   const updatedContact = req.body;

//   if (Object.keys(updatedContact).length === 0)
//     return res.json({ message: "missing fields" });

//   const validationResult = validateInput(updatedContact);

//   if (validationResult.error === undefined) {
//     const response = await updateContact(id, updatedContact);

//     return response === null
//       ? res.json({ status: 404, message: "Not found" })
//       : res.json({ status: 200, response });
//   }

//   res.json({ status: 400, error: validationResult.error });
// });

module.exports = router;