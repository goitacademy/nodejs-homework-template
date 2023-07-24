const express = require("express");

const {
  Contact,
  addContactSchema,
} = require("../../models/contact");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await Contact.find();
  res.send(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const contact = await Contact.findOne({
    _id: req.params.contactId,
  });
  if (contact) {
    res.send(contact);
  } else {
    res.status(404);
    res.send({ message: "Not found" });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addContactSchema.validate(req.body);
    if (error) {
      res
        .status(400)
        .json({ message: error.details[0].message });
      return;
    }

    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
  } catch (error) {
    console.error("Error adding contact:", error);
    res
      .status(500)
      .json({ message: "Error adding contact" });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const contact = await Contact.findOneAndDelete({
    _id: req.params.contactId,
  });
  if (contact) {
    res.send(contact);
  } else {
    res.status(404);
    res.send({ message: "Not found" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const newData = req.body;
    const { error } = addContactSchema.validate(newData);
    if (error) {
      res
        .status(400)
        .json({ message: error.details[0].message });
      return;
    }

    const contact = await Contact.findOneAndUpdate(
      { _id: req.params.contactId },
      newData,
      { new: true }
    );

    if (!contact) {
      res.status(404).json({ message: "Not found" });
      return;
    }

    res.status(200).json(contact);
  } catch (error) {
    console.error("Error updating contact:", error);
    res
      .status(500)
      .json({ message: "Error updating contact" });
  }
});

router.patch(
  "/:contactId/favorite",
  async (req, res, next) => {
    const id = req.params.contactId;
    const body = req.body;
    if (!Object.keys(body).length) {
      res
        .json({ message: "missing field favorite" })
        .status(400);
    }
    try {
      const contact = await updateStatusContact(id, body);

      if (!contact) {
        res.status(404).json({ message: "Not found" });
        return;
      }

      res.status(200).json(contact);
    } catch (error) {
      console.error("Error updating contact:", error);
      res
        .status(500)
        .json({ message: "Error updating contact" });
    }
  }
);

module.exports = router;

async function updateStatusContact(contactId, body) {
  return await Contact.findOneAndUpdate(
    { _id: contactId },
    body,
    { new: true }
  );
}
