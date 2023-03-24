const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateFavorite,
} = require("../controllers/contactsControllers");
const { getUser } = require("../controllers/usersControllers");
const { auth } = require("../auth/auth");

const router = express.Router();

router.get("/", auth, async (req, res, next) => {
  try {
    const response = await listContacts();
    return res.status(200).json({ message: response });
  } catch {
    return res.status(401).json({ message: "unathorized" });
  }
});

router.get("/:contactId", auth, async (req, res, next) => {
  const id = req.params.contactId;
  const response = await getContactById(id);
  if (!response) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json({ message: response });
});

router.post("/", auth, async (req, res, next) => {
  const body = req.body;
  const bodyKeys = Object.keys(body);
  if (!bodyKeys.includes("favorite")) {
    body.favorite = false;
  }
  try {
    const token = req.headers.authorization;
    const user = await getUser("token", token);
    const response = await addContact(body);
    await updateContact(response._id, { owner: user.id });
    return res.status(201).send({
      message: `succesfully posted user id ${response.id}`,
    });
  } catch {
    return res.status(400).send({ message: "Something went wrong" });
  }
});

router.delete("/:contactId", auth, async (req, res, next) => {
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

router.put("/:contactId", auth, async (req, res, next) => {
  const id = req.params.contactId;
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Missing fields!" });
  }
  try {
    await updateContact(id, req.body);
    return res.status(200).send({ message: "success" });
  } catch {
    return res.status(404).json({ message: "Not found!" });
  }
});

router.put("/:contactId/favorite", auth, async (req, res, next) => {
  const id = req.params.contactId;
  if (typeof req.body.favorite !== "boolean") {
    return res.status(400).send({ message: "Value should be true or false!" });
  }
  try {
    await updateFavorite(id, req.body);
    return res.status(200).json({ message: "success" });
  } catch {
    return res.status(400).send({ message: "bad request" });
  }
});

module.exports = router;
