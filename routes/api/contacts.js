const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../service");

// const { contactShemas } = require("../../schemas");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const data = await listContacts();
    res.json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const data = await getContactById(contactId);
    if (!data) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    res.json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, email, phone, favorite } = req.body;

    // const { error } = contactShemas.validate({ name, email, phone });
    // if (error) {
    //   error.status = 400;
    //   throw error;
    // }
    const body = { name, email, phone, favorite };
    const data = await addContact(body);
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const data = await removeContact(contactId);
    if (!data) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { name, email, phone, favorite } = req.body;

    // const { error } = contactShemas.validate({ name, email, phone });
    // if (error) {
    //   error.status = 400;
    //   throw error;
    // }
    const body = { name, email, phone, favorite };
    const data = await updateContact(contactId, body);
    if (!data) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
