const express = require("express");
const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const { userSchema } = require("../../models/user");

router.get("/", (req, res) => {
  try {
    const users = listContacts();
    res.status(200).json(users);
  } catch {
    return res.status(500).send("Something went wrong");
  }
});

router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const user = getContactById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).json(user);
  } catch {
    return res.status(500).send("Something went wrong");
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send("Id is required to perform delete");
  }
  if (!getContactById(id)) {
    return res.status(404).send("User not found");
  }
  try {
    removeContact(id);
    return res.status(200).send("Contact deleted");
  } catch {
    return res.status(500).send("Something went wrong");
  }
});

router.post("/", (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  try {
    const { name, email, phone, id } = req.body;
    const user = addContact(id, name, email, phone);
    return res.status(201).json(user);
  } catch {
    return res.status(500).send("Something went wrong");
  }
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send("Id is required to perform delete");
  }
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const user = getContactById(id);
  if (!user) {
    return res.status(404).send("User not found");
  }

  try {
    updateContact(id, req.body);
    return res.status(200).send("User sucessfully updated");
  } catch {
    return res.status(500).send("Something went wrong");
  }
});

module.exports = router;
