const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("./../../models/contacts");
const router = express.Router();

router.get("/", async (req, res, next) => {
  listContacts()
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  getContactById(contactId)
    .then((data) =>
      res.json({
        status: "success",
        code: 200,
        data,
      })
    )
    .catch((err) => console.log(err));
});

router.post("/", async (req, res, next) => {
  const body = req.body;

  addContact(body)
    .then((data) =>
      res.json({
        status: "success",
        code: 201,
        data,
      })
    )
    .catch((err) => console.log(err));
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  removeContact(contactId)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;
  console.log(body)
  updateContact(contactId, body)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
