const express = require("express");

const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  // res.json({ message: "Hello from GET router!" });
  return res.status(200).json(await listContacts());
});

router.get("/:id", async (req, res, next) => {
  // res.json({ message: "Hello from GET/:id router!" });
  const id = req.params.id;
  if (id) {
    return res.status(200).json(await getContactById(id));
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.post("/", async (req, res, next) => {
  // res.json({ message: "Hello from POST router!" });
  const { name, email, phone } = req.body;
  if ({ name, email, phone }) {
    return res.status(201).json(await addContact({ name, email, phone }));
  } else {
    return res.status(400).json({ message: "missing required name field" });
  }
});

router.delete("/:id", async (req, res, next) => {
  // res.json({ message: "Hello from DELETE/:id router!" });
  const id = req.params.id;
  if (id) {
    return res.status(200).json(removeContact(id));
  } else {
    return res.status(404).json({ message: "Not found" });
  }
});

router.put("/:id", async (req, res, next) => {
  // res.json({ message: "Hello from PUT/:id router!" });
  const { name, email, phone } = req.body;
  const id = req.params.id;
  if (!name || !email || !phone) {
    return res.status(400).json({ message: "missing fields" });
  } else if (name || email || phone) {
    return res.status(200).json(updateContact(id, name, email, phone));
  } else {
    return res.status(404).json({ message: "Not found" });
  }
});

// module.exports = router;
module.exports = { router };
