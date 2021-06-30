const express = require("express");
const router = express.Router();
const contactsMethod = require("../../model/index");
const validate = require("./validation");

router.get("/", async (req, res, next) => {
  // res.json({ message: "template message" });
  try {
    const contacts = await contactsMethod.getListContacts();

    return res.json({
      status: "success",
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  // res.json({ message: "template message" });
  try {
    const contact = await contactsMethod.getContactById(req.params.id);

    if (contact) {
      return res.json({
        status: "success",
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", validate.createContact, async (req, res, next) => {
  // res.json({ message: "template message" });
  try {
    const contact = await contactsMethod.addContact(req.body);
    return res.status(201).json({
      status: "success",
      code: 201,
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  // res.json({ message: "template message" });
  try {
    const contact = await contactsMethod.removeContact(req.params.id);

    if (contact) {
      return res.json({
        status: "success",
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
});

// router.patch("/:contactId", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

router.patch("/:contactId", validate.updateContact, async (req, res, next) => {
  if (req.body) {
    try {
      const contact = await contactsMethod.updateContact(
        req.params.id,
        req.body
      );

      if (contact) {
        return res.json({
          status: "success",
          code: 200,
          data: {
            contact,
          },
        });
      } else {
        return res.status(404).json({
          status: "error",
          code: 404,
          message: "Not found",
        });
      }
    } catch (error) {
      next(error);
    }
  } else {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "missing fields",
    });
  }
});

module.exports = router;
