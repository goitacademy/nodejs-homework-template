const express = require("express");

const { Contacts } = require("../schema");
const router = express.Router();
const { validateJoi } = require("./validation");

router.get("/", async (__, res) => {
  const contacts = await Contacts.find();
  try {

    res.json({
      status: "success",
      code: 200,
      data: contacts,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "Bad Request",
    });
  }
});

router.get("/:contactId", async (req, res) => {

  const { contactId } = req.params;
  try {
    const contact = await Contacts.findById(contactId);

    res.json({
      status: "success",
      code: 200,
      data: contact,
      message: "Contact has been found",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "Bad Request",
    });
  }
});

router.post("/", async (req, res) => {
 const body = req.body;
  const validate = validateJoi(contact);
  if (validate.error) return res.status(400).send(some error);
  
  const contact = new Contacts(body);
  try {
    await contact.save();
    res.json({
      status: "success",
      code: 201,
      data: contact,
      message: "Contact has been found created",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "Bad Request",
    });
  }
});

router.delete("/:contactId", async (req, res) => {

  const { contactId } = req.params;
  try {
    const deleteContact = await Contacts.deleteOne({ _id: contactId });
    res.json({
      status: "success",
      code: 200,
      data: deleteContact,

      message: "Contact has been deleted",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "Bad Request",
    });
  }
});

router.put("/:contactId", async (req, res) => {

  const { contactId } = req.params;
  const body = req.body;
  const contact = await Contacts.findOneAndUpdate({ _id: contactId }, body);
  const validate = validateJoi(contact);
  try {
    await validate.value.save();

    res.json({
      status: "success",
      code: 200,
      data: contact,
      message: "Contact has been created/updated",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "Bad Request",
    });
  }
});



router.patch("/:contactId/favorite", async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (favorite === undefined) {
    return res.status(400).json({ message: "missing field favorite" });
  }

  try {
    const updatedContact = await Contacts.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );


    if (!updatedContact) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({
      status: "success",
      code: 200,
      data: updatedContact,
      message: "Contact favorite status updated",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "Bad Request",
    });
  }
});



module.exports = router;
