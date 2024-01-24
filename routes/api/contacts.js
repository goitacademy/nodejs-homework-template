const express = require("express");
const { Contact } = require("../../contact.schema");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contact = await Contact.find();
  res.json({ data: contact });
});

router.get("/:contactId", async (req, res, next) => {
  const contact = await Contact.findOne({ _id: req.params.contactId });
  res.json({ data: contact });
});

router.post("/", async (req, res, next) => {
  const contact = new Contact({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favorite: req.body.favorite,
  });

  contact.save();
  res.json({ data: contact });
});

router.patch("/:contactId/favorite", async (req, res) => {
  console.log(req.body);
  if (req.body == null || !Object.hasOwn(req.body, "favorite")) {
    res.status(400);
    res.json({ message: "missing field favorite" });
    return;
  }

  const result = await Contact.findOneAndUpdate(
    {
      _id: req.params.contactId,
    },
    {
      $set: {
        favorite: req.body.favorite,
      },
    }
  );
  const contact = await Contact.findById(req.params.contactId);
  res.json({ data: contact });
});

router.delete("/:contactId", async (req, res, next) => {
  const result = await Contact.findOneAndDelete({ _id: req.params.contactId });
  res.json({ data: result });
});

router.put("/:contactId", async (req, res, next) => {
  const result = await Contact.findOneAndUpdate(
    {
      _id: req.params.contactId,
    },
    {
      $set: {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
      },
    }
  );
  const contact = await Contact.findById(req.params.contactId);
  res.json({ data: contact });
});

module.exports = router;
