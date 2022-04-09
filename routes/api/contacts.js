const express = require("express");
const router = express.Router();
const {
  getContactById,
  listContacts,
  addContact,
  removeContact,
  updateContact,
} = require("../../service/index");

router.get("/", async (req, res, next) => {
  res.json({ message: await listContacts() }).status(200);
});

router.get("/:contactId", async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);
  contact
    ? res.json({ message: contact }).status(200)
    : res
        .json({
          code: 404,
          message: `Not found task id`,
          data: "Not Found",
        })
        .status(404);
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (!(name && email && phone))
    return res.json({ message: "missing required name field" }).status(404);

  res.json({ message: await addContact(req.body) }).status(200);
});

router.delete("/:contactId", async (req, res, next) => {
  const contact = await removeContact(req.params.contactId);
  contact
    ? res.json({ message: contact }).status(200)
    : res
        .json({
          code: 404,
          message: `Not found task id`,
          data: "Not Found",
        })
        .status(404);
});

router.put("/:contactId", async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (!(name || email || phone))
    return res.json({ message: "missing fields" }).status(400);

  const contact = await updateContact(req.params.contactId, req.body);

  contact
    ? res.json({ message: contact }).status(200)
    : res
        .json({
          code: 404,
          message: `Not found `,
        })
        .status(404);
});

router.patch("/:contactId/favorite", async (req, res, next) => {
  const { favorite } = req.body;
  if (!favorite)
    return res.json({ message: "missing required favorite field" }).status(404);

  const contact = await updateContact(req.params.contactId, req.body);
  contact
    ? res.json({ message: contact }).status(200)
    : res
        .json({
          code: 404,
          message: `Not found `,
        })
        .status(404);
});

module.exports = router;
