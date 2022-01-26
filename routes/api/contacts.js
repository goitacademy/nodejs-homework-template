const express = require("express");
const router = express.Router();
const { NotFound, BadRequest } = require("http-errors");

const { joiSchema } = require("../../model/contact");

const { Contact } = require("../../model");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await Contact.find({}, "_id name email phone favorite");
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});
//  в find() можно передать больше одного конкретного кретерия для поиска find({price: 17000, status:"sale"})

router.get("/:id", async (req, res, next) => {
  // const { id } = req.params;
  try {
    const contact = await Contact.findById();
    if (!contact) {
      throw new NotFound();
    }
    res.json(contact);
  } catch (error) {
    if (error.message.includes("Cast to ObjectId failed")) {
      error.status = 404;
    }
    next(error);
  }
});
// findOne({ _id: id })- это для поиска по любому кретерию

router.post("/", async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
      // error.status = 400;
      // throw error;
    }
    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    if (error.message.includes("validation failed")) {
      error.status = 400;
    }
    next(error);
    // res.status(400).json({ message: "missing required name field" });
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteContact = await Contact.findByIdAndRemove(id);
    if (!deleteContact) {
      throw new NotFound();
    }
    res.json("message: contact deleted");
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateContact = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updateContact) {
      throw new NotFound();
    }
    res.json(updateContact);
  } catch (error) {
    next(error);
    // res.status(400).json({ message: "missing fields" });
  }
});
// findByIdAndUpdate возвращает старый объект, чтобы новый, то третий аргумент {new: true,}

router.patch("/:id/favorite", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { favorite } = req.body;
    const updateStatusContact = await Contact.findByIdAndUpdate(
      id,
      { favorite },
      { new: true }
    );
    if (!updateStatusContact) {
      throw new NotFound();
    }
    res.json(updateStatusContact);
  } catch (error) {
    if (error.message.includes("missing field favorite")) {
      error.status = 400;
    }
    next(error);
  }
});

module.exports = router;
