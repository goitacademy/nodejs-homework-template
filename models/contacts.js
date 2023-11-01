import fs from "fs/promises";
import path from "path";
import * as utils from "../helpers/helpers.js";

const ERR_ALREADY_EXISTS =
  "A contact with the same email or phone already exists";

const CONTACTS_PATH = path.resolve("models", "contacts.json");
const DEF_CHARSET = "utf-8";

/**
 *
 * @param {string} code
 * @param {string} message
 * @returns {Error}
 */
const CustomError = (code, message) => {
  const err = Error(message);
  err.code = code;
  return err;
};

/**
 *
 * @param {string} charset
 * @returns {array|null}
 */
const getAllContacts = async (charset = DEF_CHARSET) => {
  try {
    const data = await fs.readFile(CONTACTS_PATH, charset);
    return JSON.parse(data);
  } catch {
    return null;
  }
};

/**
 * @param {array} data
 */

const flushContacts = async (data) =>
  await fs.writeFile(CONTACTS_PATH, JSON.stringify(data, null, 2));

/**
 * @param {object} data
 */

const appendContact = async (data) => {
  const list = (await getAllContacts()) ?? [];
  await flushContacts([...list, data]);
  return data;
};

/**
 * @param {object} {email, phone}
 * @returns {boolean}
 */

const isContactExists = async ({ email, phone } = {}) => {
  const list = await getAllContacts();
  return list.some((itm) => itm.email === email || itm.phone === phone);
};

/**
 * @returns {array}
 */
export const listContacts = async () => await getAllContacts();

/**
 * @param {string} id
 * @returns {object|null}
 */

export const getContactById = async (id) => {
  const list = await getAllContacts();
  return list?.find((itm) => itm.id === id) ?? null;
};

/**
 * @param {string} id
 * @returns {object|null}
 */

export const removeContact = async (id) => {
  let removed = null;
  const list = await getAllContacts();
  const newData = list?.filter((itm) => {
    itm.id === id && (removed = itm);
    return itm.id !== id;
  });

  if (removed) await flushContacts(newData);

  return removed;
};

/**
 * @param {object} body
 * @returns {object}
 */
export const addContact = async (body) => {
  try {
    await utils.addedContactScheme.validateAsync(body);
  } catch ({ message }) {
    throw CustomError("ERR_INVALID_DATA", message);
  }

  const { name, email, phone } = body;
  const data = {
    id: utils.getId(),
    name: utils.formatName(name),
    phone: utils.formatPhone(phone),
    email: email?.trim(),
  };

  if (await isContactExists(data)) {
    throw CustomError("ERR_ALREADY_EXISTS", ERR_ALREADY_EXISTS);
  }

  return appendContact(data);
};

/**
 * @param {string} id
 * @param {object} body
 * @returns {object}
 */
export const updateContact = async (id, body) => {
  let validatedBody;

  try {
    validatedBody = await utils.updatedContactScheme.validateAsync(body);
  } catch ({ message }) {
    throw CustomError("ERR_INVALID_DATA", message);
  }

  const list = await getAllContacts();

  const updatedIndex = list?.findIndex((itm) => itm.id === id) ?? -1;
  if (updatedIndex < 0) return null;

  const { name, email, phone } = validatedBody;
  const curData = list[updatedIndex];
  const newData = {
    id,
    name: name ? utils.formatName(name) : curData.name,
    phone: phone ? utils.formatPhone(phone) : curData.phone,
    email: email?.trim() ?? curData.email,
  };

  list[updatedIndex] = newData;
  await flushContacts(list);

  return newData;
};
