const express = require("express");
const router = express.Router();
const { NotFound, BadRequest } = require("http-errors");

const { joiSchema } = require("../../model/contact");
const { Contact } = require("../../model");
const { authenticate } = require("../../middlewares");

router.get("/", authenticate, async (req, res, next) => {
  try {
    // console.log(req.query);
    const { page = 1, limit = 20, favorite = false } = req.query;
    const skip = (page - 1) * limit;
    const { _id } = req.user;

    // const contacts = await Contact.find(
    //   { owner: _id },
    //   "_id name email phone favorite" /*так пишем, когда перечисляем все поля, которые хотим видеть */
    // );
    const contacts = await Contact.find(
      { owner: _id },
      "-createdAt -updatedAt",
      { skip, limit: +limit }
    );
    if (favorite) {
      const contacts = await Contact.find({ favorite }, "", {
        skip,
        limit: +limit,
      });
      return res.json(contacts);
    }

    res.json(contacts);
  } catch (error) {
    next(error);
  }
});
//  в find() можно передать больше одного конкретного кретерия для поиска find({price: 17000, status:"sale"})

router.get("/:id", authenticate, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id } = req.user;
    const contact = await Contact.findOne({ _id: id }, { owner: _id });
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

router.post("/", authenticate, async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
      // error.status = 400;
      // throw error;
    }
    const { _id } = req.user;
    const newContact = await Contact.create({ ...req.body, owner: _id });
    res.status(201).json(newContact);
  } catch (error) {
    if (error.message.includes("validation failed")) {
      error.status = 400;
    }
    next(error);
    // res.status(400).json({ message: "missing required name field" });
  }
});

router.delete("/:id", authenticate, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id } = req.user;
    const deleteContact = await Contact.findOneAndDelete({ id, owner: _id });
    if (!deleteContact) {
      throw new NotFound();
    }
    res.json("message: contact deleted");
  } catch (error) {
    next(error);
  }
});

router.put("/:id", authenticate, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id } = req.user;
    const updateContact = await Contact.findOneAndUpdate(
      { ...req.body, id, owner: _id },
      {
        new: true,
      }
    );
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

router.patch("/:id/favorite", authenticate, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id } = req.user;
    const { favorite } = req.body;
    const updateStatusContact = await Contact.findOneAndUpdate(
      { id, owner: _id },
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
