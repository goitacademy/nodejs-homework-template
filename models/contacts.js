const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.resolve(__dirname, 'contacts.json');

/**
 * Возвращает объект со всеми контактами в формате JSON.
 * @return {json} contacts, файл c объектами контактов
 */
const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.error(error.message);
  }
};

/**
 * Записывает контакы в файл contacts.json.
 * @param {array} contacts, массив объектов с контактами.
 */
const writeContacts = async contacts => {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
  } catch (error) {
    console.error(error.message);
  }
};

/**
 * Возвращает объект контакта с заданным ID.
 * @param {string} contactId, ID контакта.
 * @return {object} contact, объект с данными контакта.
 */
const getContactById = async contactId => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find(({ id }) => id === contactId);

    return contact;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Добавляет контакт и возвращает созданный объект.
 * @param {string} name, имя.
 * @param {string} email, электронная почта.
 * @param {string} phone, номер телефона.
 * @return {Object} contact, объект нового контакта.
 */
const addContact = async ({ name, email, phone }) => {
  try {
    const contact = {
      id: nanoid(),
      name,
      email,
      phone,
    };

    const contacts = await listContacts();
    const newContacts = [...contacts, contact];
    await writeContacts(newContacts);

    return contact;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Удаляет контакт с заданным ID
 * @param {string} contactId, ID контакта.
 * @return {object} removedContact, объект удаленного контакта или undefined.
 */
const removeContact = async contactId => {
  try {
    const contacts = await listContacts();
    const removedContact = contacts.find(({ id }) => id === contactId);

    if (removedContact) {
      const updatedContacts = contacts.filter(({ id }) => id !== contactId);
      await writeContacts(updatedContacts);
    }

    return removedContact;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Обнавляет контакт с заданным ID
 * @param {string} contactId, ID контакта.
 * @param {object} update, объект с измененными полями.
 * @return {object} updatedContact, объект обновленного контакта или undefined.
 */
const updateContact = async (contactId, update) => {
  const contacts = await listContacts();
  const updatedContactIdx = contacts.findIndex(({ id }) => id === contactId);

  if (updatedContactIdx === -1) {
    return undefined;
  }

  const updatedContact = { ...contacts[updatedContactIdx], ...update };

  contacts.splice(updatedContactIdx, 1, updatedContact);
  await writeContacts(contacts);

  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
