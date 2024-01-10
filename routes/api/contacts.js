const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const postSchema = require("../../schemas/conacts-schemas");
const router = express.Router();
const jsonParser = express.json();

router.get("/", async (req, res, next) => {
  const data = await listContacts();
  res.status(200).send(data);
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const data = await getContactById(contactId);
  if (data !== null) {
    res.status(200).send(data);
  } else {
    next();
  }
});

router.post("/", jsonParser, async (req, res, next) => {
  const response = postSchema.validate(req.body, { abortEarly: false });
  console.log(response);
  if (typeof response.error !== "undefined") {
    return res
      .status(400)
      .send(response.error.details.map((err) => err.message).join(", "));
  }
  const data = await addContact(req.body);
  if (data !== null) {
    res.status(200).send(data);
  } else {
    next();
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const data = await removeContact(contactId);
  if (data !== null) {
    res.status(200).send(data);
  } else {
    next();
  }
});

router.put("/:contactId", jsonParser, async (req, res, next) => {
  if (
    req.body === "" ||
    Object.keys(req.body).length === 0 ||
    req.body === undefined
  ) {
    res.status(400).send({ message: "missing fields" });
  }
  const data = await updateContact(req.params.contactId, req.body);
  if (data !== null) {
    res.status(200).send(data);
  } else {
    next();
  }
});

module.exports = router;
//
