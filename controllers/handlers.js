// /* eslint-disable spaced-comment */
import { Contact } from "../controllers/service/schemas/user.js";

const validate = async (contactId) => {
  try {
    const contact = await Contact.findOne({ _id: contactId });
    return contact;
  } catch (err) {
    return console.log(err.message);
  }
};

const listContacts = async () => {
  try {
    const contacts = await Contact.find();
    return contacts;
  } catch (err) {
    return console.log(err.message);
  }
};

const getById = async (contactId) => {
  try {
    const contact = await Contact.findOne({ _id: contactId });
    return contact;
  } catch (err) {
    return console.log(err.message);
  }
};

const addContact = async (contact) => {
  const newContact = new Contact({
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
    favorite: contact.favorite,
  });

  await newContact.save();
  return newContact;
};

const removeContact = async (contactId) => {
  try {
    const contact = await Contact.findOneAndDelete({ _id: contactId });
    return contact;
  } catch (err) {
    return console.log(err.message);
  }
};

const updateContact = async (contactId, body) => {
  const { name, email, phone, favorite } = body;
  console.log("test");
  await Contact.updateOne(
    {
      _id: contactId,
    },
    {
      $set: {
        name,
        email,
        phone,
        favorite,
      },
    },
    {
      upsert: true,
    }
  );

  const contact = await Contact.findById(contactId);
  return contact;
};

const updateStatusContact = async (contactId, newFavorite) => {
  await Contact.findOneAndUpdate(
    {
      _id: contactId,
    },
    {
      $set: {
        favorite: newFavorite,
      },
    },
    {
      upsert: false,
    }
  );
  const contact = await Contact.findById(contactId);
  return contact;
};

export {
  updateStatusContact,
  listContacts,
  getById,
  removeContact,
  validate,
  addContact,
  updateContact,
};
