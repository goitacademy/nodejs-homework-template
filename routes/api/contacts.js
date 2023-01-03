const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const validation = require("../../models/validation");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  res.status(200).json(await listContacts());
});

router.get("/:contactId", async (req, res, next) => {
  if ((await getContactById(req.params.id)) === null) {
    res.status(404).json({ message: "Not Found" });
  }
  res.status(200).json(await getContactById(req.params.contactId));
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;
  const validatedData = await validation.validate({
    name,
    email,
    phone,
  });
  if (validatedData.error) {
    return res.status(400).json({ message: "missing required name field" });
  }
  await addContact(validatedData);
  res.status(201).json({ status: "success" });
});

router.delete("/:contactId", async (req, res, next) => {
  if ((await getContactById(req.params.id)) === null) {
    res.status(404).json({ message: "Not Found" });
  }
  await removeContact(req.params.contactId);
  res.status(200).json({ message: "contact deleted" });
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const validationResult = validation.validate(req.query);
    if (validationResult.error) {
      return res.status(404).json({
        message: "missing fields",
      });
    }

    const contacts = await updateContact(req.params.id, req.query);
    if (!contacts) {
      res.status(404).json({
        message: "Not found",
      });
    } else {
      res.status(200).json({
        status: "success",
        data: { contacts },
      });
    }
  } catch (error) {
    next(error);
  }
});

// router.put("/:contactId", async (req, res, next) => {
//   const { name, email, phone } = req.query;
//   const id = req.params.contactId;
//   if (name === undefined || email === undefined || phone === undefined) {
//     res.status(400).json({ message: "missing fields" });
//   }
//   try {
//     const validatedData = await validation.validateAsync({
//       name,
//       email,
//       phone,
//     });
//     const updatedContact = await updateContact(id, validatedData);
//     if (updatedContact) {
//       res.status(200).json(updatedContact);
//     }
//     res.status(404).json({ message: "Not found" });
//   } catch (err) {
//     res.status(404).json({ message: err });
//   }
// });

module.exports = router;
