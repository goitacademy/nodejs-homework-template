import express from 'express';
import actions from '../../models/contacts.js';
const router = express.Router();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = actions;

router.get('/', async (_, res) => {
  const { data: contactList } = await listContacts();

  if (!contactList) {
    return res.status(404).json({
      message: `Not found`,
    });
  }

  res.status(200).json(JSON.parse(contactList));
});

router.get('/:contactId', async (req, res) => {
  const { contactId } = req.params;
  const { data: contact } = await getContactById(contactId);

  if (!contact) {
    return res.status(404).json({ message: 'Not found' });
  }

  res.status(200).json(JSON.parse(contact));
});

/**
 * Получает body в формате {name, email, phone} (все поля обязательны)
Если в body нет каких-то обязательных полей, возвращает json с ключом {"message": "missing required name field"} и статусом 400
Если с body все хорошо, добавляет уникальный идентификатор в объект контакта
Вызывает функцию addContact(body) для сохранения контакта в файле contacts.json
По результату работы функции возвращает объект с добавленным id {id, name, email, phone} и статусом 201
 */
router.post('/', async (req, res) => {
  const { data: newContact } = await addContact(req.body);

  if (!newContact) {
    return res.status(400).json({ message: 'Bad request' });
  }

  res.status(201).json(JSON.parse(newContact));
});

/**
 * Получает параметр id
Получает body в json-формате c обновлением любых полей name, email и phone
Если body нет, возвращает json с ключом {"message": "missing fields"} и статусом 400
Если с body все хорошо, вызывает функцию updateContact(contactId, body) (напиши ее) для обновления контакта в файле contacts.json
По результату работы функции возвращает обновленный объект контакта и статусом 200. В противном случае, возвращает json с ключом "message": "Not found" и статусом 404
 */
router.put('/:contactId', async (req, res) => {
  const {
    params: { contactId },
    body,
  } = req;

  const { data: updatedContact } = await updateContact({ contactId, ...body });

  if (!updatedContact) {
    return res.status(404).json({ message: 'Not found' });
  }

  res.status(200).json(JSON.parse(updatedContact));
});

/**
 * Не получает body
Получает параметр id
вызывает функцию removeContact для работы с json-файлом contacts.json
если такой id есть, возвращает json формата {"message": "contact deleted"} и статусом 200
если такого id нет, возвращает json с ключом "message": "Not found" и статусом 404
 */
router.delete('/:contactId', async (req, res) => {
  const { contactId } = req.params;

  const { data: contact } = await removeContact(contactId);

  if (!contact) {
    return res.status(404).json({ message: 'Not found' });
  }

  res.status(200).json({ message: 'Contact deleted' });
});

export default router;
