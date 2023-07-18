const { Contact } = require("../models/contact");

const getContactsAll = async (_id, page, limit, favorite) => {
  const skip = (page - 1) * limit;

  if (!favorite) {
    const contacts = await Contact.find({ owner: _id }, " ", {
      skip,
      limit: Number(limit),
    }).populate("owner", "_id email subscription");
    return contacts;
  }

  const contacts = await Contact.find({ owner: _id, favorite }, " ", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id email subscription");

  return contacts;
};

const getById = async (contactId) => {
  try {
    const contactById = await Contact.findById(contactId);
    return contactById;
  } catch (error) {
    return null;
  }
};

const removeContact = async (contactId, _id) => {
  try {
    const deletedContact = await Contact.findByIdAndRemove(contactId);
    return deletedContact;
  } catch (error) {
    return null;
  }
};

const addNewContact = async ({ name, email, phone, favorite }, _id) => {
  const newContact = await new Contact({
    name,
    email,
    phone,
    favorite,
    owner: _id,
  });
  await newContact.save();
  return newContact;
};

const changeContact = async (contactId, { name, email, phone }) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      {
        $set: { name, email, phone },
      },
      { new: true }
    );
    return updatedContact;
  } catch (error) {
    return null;
  }
};

const changeStatus = async (contactId, { favorite }) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { $set: { favorite } },
      { new: true }
    );
    return updatedContact;
  } catch (error) {
    return null;
  }
};

module.exports = {
  getContactsAll,
  getById,
  removeContact,
  addNewContact,
  changeContact,
  changeStatus,
};
