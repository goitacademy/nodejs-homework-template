const express = require("express"); // створюємо веб-сервер
const Joi = require("joi"); // joi - для перевірки правильності даних

const addSchema = Joi.object({
  // схема joi - для того, щоб кожній змінні прописати, якого типу вона повинна бути
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const { HttpError } = require("../../helpers/HttpError"); // імпортуємо помилку для прокидування

const router = express.Router(); // створюємо router (це як записна книга, де по шляху можна побачити, що потрібно робити)

const contacts = require("../../models/contacts"); // імпортуємо файл з ф-ціями, які повертають необхідні дані (усі контакти, або контакт по id...)

// по шляху '/' викликаємо ф-цію, яка повертає усі контакти
router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

// по шляху '/:contactId' викликаємо ф-цію, яка повертає контакт з id, який можна витягнути з req.params - параметри запиту
router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

// викликаємо ф-цію, яка у базу данних (файл json з даними добавить новий запис).
router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, { message: "missing required name field" });
    }

    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

// викликаємо ф-цію, яка видалить у базі данних запис з таким id
router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

// викликаємо ф-цію, яка запис по id замінить на новий запис
router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { error } = addSchema.validate(req.body);

    if (error) {
      throw HttpError(400, { message: "missing fields" });
    }

    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
