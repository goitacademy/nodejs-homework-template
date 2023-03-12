const express = require("express");
const router = express.Router();
const { CastError } = require("mongoose");
const {
  getContactById,
  listContacts,
  addContact,
  removeContact,
  updateContact,
} = require("./utils");
const { auth } = require("../middlewares/auth");
const {
  PostContactShema,
  UpdateContactShema,
  UpdateStatusContactShema,
} = require("../validation/validation");

router.get("/", auth, async (req, res, next) => {
  const getContact = await listContacts();
  try {
    getContact !== []
      ? res.json({
          status: "success",
          code: 200,
          contact: getContact,
        })
      : res.status(404).json({
          status: "undefined",
          code: 404,
          message: "Not found",
        });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "500 Internal Server Error",
    });
  }
});

router.get("/:contactId", auth, async (req, res, next) => {
  try {
    const { _id: owner } = req.user;

    const contact = await getContactById(req.params.contactId, owner);
    if (contact != null) {
      res.json({
        status: "success",
        code: 200,
        contact,
      });
    } else {
      res.status(404).json({
        status: "undefined",
        code: 404,
        message: "Not found",
      });
    }
  } catch (error) {
    if (error instanceof CastError) {
      return res.status(404).json({
        status: "undefined",
        code: 404,
        message: "Not found",
      });
    } else {
      res.status(500).json({
        error: "500 Internal Server Error",
      });
    }
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const { error } = PostContactShema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.message,
      });
    }
    const { name, email, phone } = req.body;
    const { _id: owner } = req.user;
    const Contacts = await addContact({ name, email, phone, owner });

    res.status(201).json({
      message: "contact added",
      status: 201,
      data: Contacts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "500 Internal Server Error",
    });
  }
});

router.delete("/:contactId", auth, async (req, res, next) => {
  const { _id: owner } = req.user;

  try {
    const { contactId } = req.params;
    const deleteContact = await removeContact(contactId, owner);
    if (deleteContact !== null) {
      res.status(200).json({
        status: 200,
        message: `Contact was deleted`,
        contact: deleteContact,
      });
    } else {
      res.status(404).json({
        status: "undefined",
        code: 404,
        message: "Contact not found",
      });
    }
  } catch (error) {
    if (error instanceof CastError) {
      return res.status(404).json({
        status: "undefined",
        code: 404,
        message: "Not found",
      });
    }

    return res.status(500).json({
      error: "500 Internal Server Error",
    });
  }
});

router.put("/:contactId", auth, async (req, res, next) => {
  try {
    const { _id: owner } = req.user;

    const { error } = UpdateContactShema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.message,
      });
    }
    const update = await updateContact(req.params.contactId, req.body, owner);

    res.status(200).json({
      message: "contact updated",
      status: 200,
      data: update,
    });
  } catch (error) {
    if (error instanceof CastError) {
      return res.status(404).json({
        status: "undefined",
        code: 404,
        message: "Not found",
      });
    }

    return res.status(500).json({
      error: "500 Internal Server Error",
    });
  }
});

router.patch("/:contactId/favorite", auth, async (req, res, next) => {
  try {
    // const { favorite } = req.body;
    const { _id: owner } = req.user;

    const { error } = UpdateStatusContactShema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: "missing field favorite",
      });
    }
    const updateStatusContact = await updateContact(
      req.params.contactId,
      req.body,
      owner
    );

    res.status(200).json({
      message: "contact updated",
      status: 200,
      data: updateStatusContact,
    });
  } catch (error) {
    if (error instanceof CastError) {
      return res.status(404).json({
        status: "undefined",
        code: 404,
        message: "Not found",
      });
    }

    return res.status(500).json({
      error: "500 Internal Server Error",
    });
  }
});

module.exports = router;
