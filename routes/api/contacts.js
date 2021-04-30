const express = require("express");
const router = express.Router();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../model/controllers");
const {
  validatingAddContact,
  validatingUpdateContact,
} = require("./valid-contacts");

// --Get all contacts
// GET /api/contacts
// ! ничего не получает
// ! вызывает функцию listContacts для работы с json-файлом contacts.json
// ! возвращает массив всех контактов в json-формате со статусом 200
router.get("/", async (_req, res, next) => {
  try {
    const contacts = await listContacts();
    return res.json({
      status: "success",
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (e) {
    next(e);
  }
});

// --Get contact by ID
// GET /api/contacts/:contactId
// ! Не получает body
// ! Получает параметр contactId
// ! вызывает функцию getById для работы с json-файлом contacts.json
// ! Eсли такой id есть, возвращает обьект контакта в json-формате
// со статусом 200
// ! Eсли такого id нет, возвращает json с ключом "message": "Not found" и
// статусом 404
router.get("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const contact = await getContactById(id);
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
        message: "Not Found",
      });
    }
  } catch (e) {
    next(e);
  }
});

// --Adding contact to contacts list
// POST /api/contacts
// ! Получает body в формате {name, email, phone}
// ! Если в body нет каких-то обязательных полей, возвращает json с ключом {"message": "missing required name field"} и статусом 400
// ! Если с body все хорошо, добавляет уникальный идентификатор в объект контакта
// ! Вызывает функцию addContact(body) для сохранения контакта в файле contacts.json
// ! По результату работы функции возвращает объект с добавленным id {id, name, email, phone} и статусом 201
router.post("/", validatingAddContact, async (req, res, next) => {
  try {
    const contact = await addContact(req.body);
    if (contact) {
      return res.json({
        status: "success",
        code: 201,
        data: {
          contact,
        },
      });
    } else {
      return res.status(400).json({
        message: "Missing required name field",
      });
    }
  } catch (e) {
    next(e);
  }
});

// --Removing contact
// DELETE /api/contacts/:contactId
// ! Не получает body
// ! Получает параметр contactId
// ! вызывает функцию removeContact для работы с json-файлом contacts.json
// ! Eсли такой id есть, возвращает json формата
// {"message": "contact deleted"} и статусом 200
// ! Eсли такого id нет, возвращает json с ключом
// "message": "Not found" и статусом 404
router.delete("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const contact = await removeContact(id);
    if (contact) {
      return res.json({
        status: "success",
        code: 200,
        message: "contact deleted",
      });
    } else {
      return res.status(404).json({
        message: "Not Found",
      });
    }
  } catch (e) {
    next(e);
  }
});

// --Update contact by ID
// PUT /api/contacts/:contactId
// ! Получает параметр contactId
// ! Получает body в json-формате c обновлением любых полей name, email и phone
// ! Если body нет, возвращает json с ключом {"message": "missing fields"}
// и статусом 400
// ! Если с body все хорошо, вызывает функцию updateContact(contactId, body)
// (напиши ее) для обновления контакта в файле contacts.json
// ! По результату работы функции возвращает обновленный объект контакта и
// статусом 200. В противном случае, возвращает json с ключом "message": "Not found" и статусом 404
router.put("/:contactId", validatingUpdateContact, async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const contact = await updateContact(id, req.body);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.json({
      status: "success",
      code: 200,
      data: {
        contact,
      },
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
