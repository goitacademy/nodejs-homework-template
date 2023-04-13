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
  userValidationSchema,
  favoriteValidationSchema,
} = require("../../models/user");

const auth = require("../../auth/auth");

router.get("/", auth, async (req, res) => {
  try {
    const users = await listContacts();
    res.status(200).json(users);
  } catch {
    return res.status(500).send("Something went wrong");
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getContactById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).json(user);
  } catch {
    return res.status(500).send("Something went wrong");
  }
});

router.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send("Id is required to perform delete");
  }
  if (!getContactById(id)) {
    return res.status(404).send("User not found");
  }
  try {
    await removeContact(id);
    return res.status(200).send("Contact deleted");
  } catch {
    return res.status(500).send("Something went wrong");
  }
});

router.post("/", auth, async (req, res) => {
  const { error } = userValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  try {
    const { name, email, phone, favorite } = req.body;
    const user = await addContact(name, email, phone, favorite);
    return res.status(201).json(user);
  } catch {
    return res.status(500).send("Something went wrong");
  }
});

router.put("/:id", auth, (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (!id) {
    return res.status(400).send("Id is required to update");
  }
  const { error } = userValidationSchema.validate(req.body);
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

router.patch("/:id/favorite", auth, (req, res) => {
  const { id } = req.params;
  if (!req.body) {
    return res.status(400).send("Missing favorite");
  }
  const { error } = favoriteValidationSchema.validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const user = getContactById(id);
  if (!user) {
    return res.status(404).send("User not found");
  }

  try {
    updateContact(id, req.body);
    console.log(req.body);
    return res.status(200).send("User sucessfully updated");
  } catch {
    return res.status(500).send("Something went wrong");
  }
});

module.exports = router;
