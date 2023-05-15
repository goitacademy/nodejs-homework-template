const express = require("express");
const { auth } = require("../../auth/auth.js");
const { schemaPut, schemaPost, schemaPatch } = require("../../schema.js");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contacts.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch {
    return res.status(500).send("Something went wrong");
  }
});

router.get("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getContactById(id);
    if (!user) {
      res
        .status(404)
        .json({ message: `Not found: there is no user with ${id} id` });
    } else {
      res.status(200).json({ user });
    }
  } catch {
    return res.status(500).send("Something went wrong");
  }
});

router.post("/", auth, async (req, res, next) => {
  const { error } = schemaPost.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(404).json({ message: `${error.message}` });
  }
  try {
    const response = await addContact(req.body);
    return res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ message: "sth went wrong!!" });
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send("Id is required to perform delete");
  }
  try {
    await removeContact(id);
    return res.status(200).json({ message: `contact with ${id} id deleted` });
  } catch (err) {
    return res.status(500).send(`${err}`);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send("Id is required to perform put");
  }

  const { error } = schemaPut.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res.status(404).json({ message: `${error.message}` });
  }
  try {
    const updatedContact = await updateContact(id, req.body);
    res.status(200).json(updatedContact);
  } catch (err) {
    res.status(500).json({ message: `${err}` });
  }
});

router.patch("/:id/favorite", auth, async (req, res, next) => {
  const { id } = req.params;
  const { favorite } = req.body;
  const { error } = schemaPatch.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res.status(404).json({ message: `${error.message}` });
  }

  try {
    const updatedStatus = await updateStatusContact(id, favorite);
    if (updatedStatus) {
      res.status(200).json(updatedStatus);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    res.status(500).json({ message: `${err}` });
  }
});

module.exports = router;
