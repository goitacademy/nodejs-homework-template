const express = require("express");

const router = express.Router();
// const contacts = require("../../models/contacts.json");

const contacts = require("../../models/contacts");

router.get("/", async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
});

router.get("/:id", async (req, res) => {
  // const { contactId } = req.params;
  const getContact = await contacts.getContactById(contactId);
  res.json(getContact);
});

router.post("/", async (req, res) => {
  res.json(contacts[0]);
});
router.put("/:id", async (req, res) => {
  res.json(contacts[0]);
});
router.delete("/:id", async (req, res) => {
  res.json(contacts[0]);
});

// app.use((req, res, next) => {
//   res.status(404).json({ message: "Not found" });
//   console.log("first middleware");
//   next();
// });

// app.use((err, req, res, next) => {
//   res.status(500).json({ message: err.message });
//   console.log("Second middleware");
//   next();
// });

// router.get('/', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.get('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.post('/', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.delete('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.put('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

module.exports = router;
