const express = require("express");

const router = express.Router();

const {
  Contact,
  joiSchema,
  joiSchemaUpdate,
  joiSchemaFavorite,
} = require("../../models/contact");

// Показати всі контакти
router.get("/", async (req, res, next) => {
  try {
    const contacts = await Contact.find({});
    res.json({
      status: "success",
      code: 200,
      data: {
        result: contacts,
      },
    });
  } catch (error) {
    next(error);
  }
});

// Знайти контакт по id
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (!contact) {
      return null;
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result: contact,
      },
    });
  } catch (error) {
    next(error);
  }
});

// Додавання нового контакту
router.post("/", async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      error.status = 400;
      res.json({ message: "missing required name field" });
      throw error;
    }
    const contactAdd = await Contact.create(req.body);

    res.json({
      status: "success",
      code: 200,
      data: {
        result: contactAdd,
      },
    });
  } catch (error) {
    next(error);
  }
});

// Видалення контакту
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndRemove(id);
    if (!result) {
      const { error } = new Error(`Contact with id=${id} not found`);
      throw error;
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
  }
  // res.json({ message: "contact deleted" });
});

// Зміна значення поля по id
router.put("/:id", async (req, res, next) => {
  try {
    const { error } = joiSchemaUpdate.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { id } = req.params;

    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json({ result });
  } catch (error) {
    next(error);
  }
});

// Зміна значення одного поля
router.patch("/:id/favorite", async (req, res, next) => {
  try {
    const { error } = joiSchemaFavorite.validate(req.body);
    if (error) {
      error.status = 400;
      throw error({ message: "missing field favorite" });
    }
    const { id } = req.params;
    const { favorite } = req.body;

    const result = await Contact.findByIdAndUpdate(
      id,
      { favorite },
      { new: true }
    );
    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
