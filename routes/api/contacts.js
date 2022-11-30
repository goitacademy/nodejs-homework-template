const express = require("express");

const router = express.Router();

const contactOperation = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactOperation.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        result: contacts,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Server error",
    });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactOperation.getContactById(contactId);
    console.log(result);

    if (!result) {
      const error = new Error(`Contact with id=${contactId} not found`);
      error.status = 404;
      throw error;
      // res.status(404).json({
      //   status: "error",
      //   code: 404,
      //   message: `Contact with id=${contactId} not found`,
      // });
      // return;
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result: result,
      },
    });
  } catch (error) {
    next(error);
    //   res.status(500).json({
    //     status: "error",
    //     code: 500,
    //     message: "Server error",
    //   });
  }
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
