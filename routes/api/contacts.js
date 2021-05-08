const express = require("express");
const router = express.Router();
const Contacts = require("../../model/contacts");
const {
  validCreateContact,
  validUpdateContact,
} = require("./valid-contact-router");

router.get("/", async (_req, res, next) => {
  try {
    const contacts = await Contacts.listContacts();
    return res.json({
      status: "success",
      code: 200,
      data: { contacts },
    });
  } catch (e) {
    next(e);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.id);
    if (contact) {
      return res.json({
        status: "success",
        code: 200,
        data: { contact },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: "Not found",
      });
    }
  } catch (e) {
    next(e);
  }
});

router.post("/",validCreateContact, async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body);
    return res.status(201).json({
      status: "success",
      code: 200,
      data: { contact },
    });
  } catch (e) {
    next(e);
  }
});

router.put("./id",validUpdateContact, async (req, res, next) => {
  try {
    const contact = await Contacts.updateContact(req.params.id, req.body);
    if (contact) {
      return res.json({
        status: "success",
        code: 200,
        data: { contact },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }
  } catch (e) {
    next(e);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.id);
    if (contact) {
      return res.json({
        status: "success",
        code: 200,
        message: "contact deleted",
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }
  } catch (e) {
    next(e);
  }
});

// router.patch("/:contactId",validUpdateContact, async (req, res, next) => {
//   try {
//     const contact = await Contacts.updateContact(req.params.id, req.body);
//     if (contact) {
//       return res.json({
//         status: "success",
//         code: 200,
//         data: { contact },
//       });
//     } else {
//       return res.status(404).json({
//         status: "error",
//         code: 404,
//         data: "Not found",
//       });
//     }
//   } catch (e) {
//     next(e);
//   }
// });

module.exports = router;
