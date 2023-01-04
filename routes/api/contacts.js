const express = require("express");

const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const {
  validateAddContact,
  validateUpdateContact,
} = require("../../middlewares/validation");

router.get("/", async (req, res, next) => {
  return res.status(200).json(await listContacts());
});

// router.get("/:id", async (req, res, next) => {
//   // res.json({ message: "Hello from GET/:id router!" });
//   const { id } = req.params;
//   if (id) {
//     return res.status(200).json(await getContactById(id));
//   } else {
//     res.status(404).json({ message: "Not found" });
//   }
// });

// router.get("/:id", async (req, res, next) => {
//   const { id } = req.params;
//   const contact = await getContactById(id);
//   if (!contact) {
//     return res.status(404).json({ message: "Not found" });
//   }
//   res.status(200).json(contact);
// });

router.get("/:contactId", async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(contact);
});

// router.post("/", async (req, res, next) => {
//   // res.json({ message: "Hello from POST router!" });
//   const { name, email, phone } = req.body;
//   if ((name, email, phone)) {
//     return res.status(201).json(await addContact(name, email, phone));
//   } else {
//     return res.status(400).json({ message: "missing required name field" });
//   }
// });

// router.post("/", async (req, res, next) => {
//   // const { name, email, phone } = req.body;
//   const result = await addContact(req.body, res);
//   // if (!result) {
//   //   return res.status(400).json({ message: "missing required name field" });
//   // }
//   res.status(201).json(result);
// });

//TODO: method POST not validate

router.post("/", validateAddContact, async (req, res, next) => {
  const result = await addContact(req.body, res);

  res.status(201).json(result);
});

// router.delete("/:id", async (req, res, next) => {
//   // res.json({ message: "Hello from DELETE/:id router!" });
//   const { id } = req.params;
//   if (id) {
//     return res.status(200).json(removeContact(id));
//   } else {
//     return res.status(404).json({ message: "Not found" });
//   }
// });

// router.delete("/:id", async (req, res, next) => {
//   const { id } = req.params;
//   const result = await removeContact(id);
//   if (!result) {
//     return res.status(404).json({ message: "Not found" });
//   }
//   res.status(200).json({ message: "contact deleted" });
// });

//TODO: method DELETE not validate

router.delete("/:contactId", async (req, res, next) => {
  const result = await removeContact(req.params.contactId, res);
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ message: "contact deleted" });
});

// router.put("/:id", async (req, res, next) => {
//   // res.json({ message: "Hello from PUT/:id router!" });
//   const { name, email, phone } = req.body;
//   const { id } = req.params;
//   if (!name || !email || !phone) {
//     return res.status(400).json({ message: "missing fields" });
//   } else if (name || email || phone) {
//     return res.status(200).json(updateContact(id, name, email, phone));
//   } else {
//     return res.status(404).json({ message: "Not found" });
//   }
// });

// router.put("/:id", async (req, res, next) => {
//   // const { name, email, phone } = req.body;
//   const { id } = req.params;
//   const result = await updateContact(id, req.body, res);
//   if (!result) {
//     return res.status(404).json({ message: "Not found" });
//   }
//   res.status(200).json(result);
// });

//TODO: method POST not validate

router.put("/:contactId", validateUpdateContact, async (req, res, next) => {
  const result = await updateContact(req.params.contactId, req.body, res);
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json(result);
});

module.exports = router;
// module.exports = { contactsRouter: router };
