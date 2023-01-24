const { Contacts } = require("../db/contactsModel");

const listContacts = async (req) => {
  const { id } = req.user;
  console.log(id);
  try {
    const data = await Contacts.find({ owner: id });
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getById = async (contactId, ownerId) => {
  try {
    const data = await Contacts.findById({ owner: ownerId, _id: contactId });
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const removeContact = async (contactId, ownerId) => {
  try {
    const data = await Contacts.findByIdAndRemove({
      owner: ownerId,
      _id: contactId,
    });
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const addContact = async (req) => {
  const { name, email, phone, favorite } = req.body;
  try {
    const contact = new Contacts({
      owner: req.user.id,
      name: name,
      email: email,
      phone: phone,
      favorite: favorite ? favorite : false,
    });
    await contact.save();
    return contact;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateContact = async (contactId, body, ownerId) => {
  try {
    await Contacts.findByIdAndUpdate(
      { owner: ownerId, _id: contactId },
      {
        $set: {
          name: body.name,
          email: body.email,
          phone: body.phone,
          favorite: body.favorite,
        },
      }
    );
    const data = await Contacts.findById({ owner: ownerId, _id: contactId });
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateStatusContact = async (contactId, body, ownerId) => {
  try {
    await Contacts.findByIdAndUpdate(
      { owner: ownerId, _id: contactId },
      {
        favorite: body.favorite,
      }
    );
    const data = await Contacts.findById({ owner: ownerId, _id: contactId });
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
