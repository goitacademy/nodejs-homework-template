const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateFavorite,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const response = await listContacts();
    return res.status(200).json({ message: response });
  } catch {
    return res.status(404).json({ message: "Not found" });
  }
});

router.get("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const response = await getContactById(id);
  if (!response) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json({ message: response });
});

router.post("/", async (req, res, next) => {
  const body = req.body;
  const bodyKeys = Object.keys(body);
  if (!bodyKeys.includes("favorite")) {
    body.favorite = false;
  }
  try {
    const response = await addContact(body);
    return res.status(201).send({
      message: `succesfully posted user id ${response.id}`,
    });
  } catch {
    return res.status(400).send({ message: "Something went wrong" });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await getContactById(id);
  if (contact === undefined) {
    return res.status(404).json({ message: "Contact not found!" });
  }
  try {
    await removeContact(id);
    return res.status(200).json({ message: `Contact with id ${id} deleted` });
  } catch {
    return res.status(404).json({ message: "Not found!" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Missing fields!" });
  }
  try {
    await updateContact(id, req.body);
    return res.status(200).send({ message: "success" });
  } catch {
    return res.status(404).json({ message: "Not foussdnd!" });
  }
});

router.put("/:contactId/favorite", async (req, res, next) => {
  const id = req.params.contactId;
  if (typeof req.body.favorite !== "boolean") {
    return res.status(400).send({ message: "Something went wrong" });
  }
  try {
    await updateFavorite(id, req.body);
    return res.status(200).json({ message: "success" });
  } catch {
    return res.status(404).send({ message: "ccc" });
  }
});

module.exports = router;
