import { error } from 'console';
import fs from 'fs/promises';
import { nanoid } from 'nanoid';
import path from 'path';
const contactPath = path.resolve('models', 'contacts.json');

export const listContacts = async (req, res, next) => {
  console.log('req', req);
  try {
    const data = await fs.readFile(contactPath);
    return JSON.parse(data);
  } catch (error) {
    res.status(500).json({ message: 'Error server' });
  }
};

export const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const allContact = await listContacts();

    const elIdx = allContact.findIndex(el => el.id === contactId);
    const result = allContact[elIdx];

    if (!result) {
      // console.log('res', res);
      res
        .status(404)
        .json({ message: `Movie whith id ${contactId}  not found` });
      throw error;
    }
    const newArr = allContact.filter((el, idx) => idx !== elIdx);
    await fs.writeFile(contactPath, JSON.stringify(newArr, null, 2));
    return result;
  } catch (error) {
    console.log('error!!!', '!!!!');
    console.log('error', error);
    // error.stattus(404);
    // res.status(404).json({ message: 'Movie whith id  not found' });
    // res
  }
};

export const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const allContacts = await listContacts();
  const resp = allContacts.find(el => el.id === contactId);
  if (!resp) {
    res.status(404).json({ message: 'Movie whith id  not found' });
  }
};

export const addContact = async ({ name, email, phone }) => {
  try {
    const createContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    const allContacts = await listContacts();
    const newArr = [createContact, ...allContacts];
    console.log('newArr', newArr);
    await fs.writeFile(contactPath, JSON.stringify(newArr, null, 2));
    return createContact;
  } catch (error) {
    throw error;
  }
};

export const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();
  const item = allContacts.find(el => el.id === contactId);
};

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };
