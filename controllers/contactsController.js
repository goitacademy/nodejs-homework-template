import * as api from '../models/contacts.js';

const STATUS = {
  ok: 200,
  created: 201,
  badRequest: 400,
  notFound: 404,
  alreadyExists: 409,
  invalidData: 422,
};

const CODE = {
  notFound: { message: 'Not found' },
  deleted: { message: 'Contact deleted' },
};

export const listContacts = async (req, res, next) => {
  res.status(STATUS.ok).json(await api.listContacts());
};

export const getContactById = async ({ params }, res) => {
  const { id } = params;
  const data = await api.getContactById(id);
  res.status(data ? STATUS.ok : STATUS.notFound).json(data ?? CODE.notFound);
};

export const removeContact = async ({ params }, res) => {
  const { id } = params;
  const data = await api.removeContact(id);

  res
    .status(data ? STATUS.ok : STATUS.notFound)
    .json(data ? CODE.deleted : CODE.notFound);
};

export const addContact = async ({ body }, res) => {
  try {
    // добавляем контакт в БД
    res.status(STATUS.created).json(await api.addContact(body));
  } catch ({ code, message }) {
    const status =
      code === 'ERR_INVALID_DATA' ? STATUS.badRequest : STATUS.alreadyExists;
    res.status(status).json({ message });
  }
};

export const updateContact = async ({ body, params }, res) => {
  const { id } = params;
  try {
    // обновляем данные контакта
    const updated = await api.updateContact(id, body);
    res
      .status(updated ? STATUS.ok : STATUS.notFound)
      .json(updated ?? CODE.notFound);
  } catch ({ message }) {
    res.status(STATUS.badRequest).json({ message });
  }
};
