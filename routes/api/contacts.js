const express = require("express");

const {
  getListContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require("../../models/contacts");

const { RequestError } = require("../../assistant");

const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const router = express.Router();

// @ GET /api/contacts
// 1. ничего не получает
// 2. вызывает функцию listContacts для работы с json-файлом contacts.json
// 3. возвращает массив всех контактов в json-формате со статусом 200

router.get("/", async (req, res, next) => {
  try {
    const result = await getListContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// @ GET /api/contacts/:id
// 1. Не получает body
// 2. Получает параметр id
// 3. вызывает функцию getById для работы с json-файлом contacts.json
// 4. если такой id есть, возвращает объект контакта в json-формате со статусом 200
// 5. если такого id нет, возвращает json с ключом "message": "Not found" и статусом 404

router.get("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const result = await getContactById(id);
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// @ POST /api/contacts
// 1. Получает body в формате {name, email, phone} (все поля обязательны)
// 2. Если в body нет каких-то обязательных полей, возвращает json с ключом {"message": "missing required name field"} и статусом 400
// 3. Если с body все хорошо, добавляет уникальный идентификатор в объект контакта
// 4. Вызывает функцию addContact(body) для сохранения контакта в файле contacts.json
// 5. По результату работы функции возвращает объект с добавленным id {id, name, email, phone} и статусом 201

router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw RequestError(400, "Missing required name field");
    }
    const result = await addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

// @ DELETE /api/contacts/:id
// 1. Не получает body
// 2. Получает параметр id
// 3. вызывает функцию removeContact для работы с json-файлом contacts.json
// 4. если такой id есть, возвращает json формата {"message": "contact deleted"} и статусом 200
// 5. если такого id нет, возвращает json с ключом "message": "Not found" и статусом 404

router.delete("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const result = await removeContact(id);
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
});

// @ PUT /api/contacts/:id
// 1. Получает параметр id
// 2. Получает body в json-формате c обновлением любых полей name, email и phone
// 3. Если body нет, возвращает json с ключом {"message": "missing fields"} и статусом 400
// 4. Если с body все хорошо, вызывает функцию updateContact(contactId, body) (напиши ее) для обновления контакта в файле contacts.json
// 5. По результату работы функции возвращает обновленный объект контакта и статусом 200. В противном случае, возвращает json с ключом "message": "Not found" и статусом 404

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw RequestError(400, "missing fields");
    }
    const id = req.params.contactId;
    const result = await updateContact(id, req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
