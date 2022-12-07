const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("../../models/contacts");
// import listContacts from ("../../models/contacts");

// http://localhost:3000/api/contacts
//  npx nodemon server.js

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json({
      status: "succsses",
      code: 200,
      data: {
        result,
      },
      message: "200 succsses",
    });
  } catch (error) {
    console.error(next.error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const result = await getContactById();
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
      message: `contact with id: ${result.id}`,
    });
  } catch (error) {
    this.console.error(next.error);
  }
});

router.post("/", async (req, res, next) => {
  const body = req.body;

  const result = await addContact(body);

  try {
    res.json({
      status: "success",
      code: 201,
      body: {
        result,
      },
      message: "template message",
    });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const result = await removeContact();
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
    message: "template message",
  });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
