const shortid = require("shortid");
const { Contact } = require("../../routes/api/contacts.model");

const listContacts = async (req) => {
  try {
    const { _id } = req.user;
    return Contact.find({ owner: _id }).populate("owner", "name _id email");
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = Contact.findById(contactId);
    if (!data) {
      return null;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (req) => {
  try {
    const { contactId } = req.params;
    const { _id } = req.user;

    return Contact.findOneAndDelete({
      contactId,
      owner: _id,
    });
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (req) => {
  const { _id } = req.user;

  const { name, email, phone, favorite } = req.body;
  try {
    const newCont = {
      name,
      email,
      phone,
      favorite,
      id: shortid.generate(),
    };

    const existingCont = await Contact.findOne({ email });
    if (existingCont) {
      throw new Error("Contact already posted");
    }
    return Contact.create({ ...newCont, owner: _id });
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (req) => {
  const { _id } = req.user;
  const { contactId } = req.params.contactId;

  try {
    return Contact.findOneAndUpdate({ contactId, owner: _id }, req.body);
  } catch (error) {
    console.log(error);
  }
};

const updateStatusContact = async (req) => {
  try {
    const { _id } = req.user;
    const { contactId } = req.params.contactId;

    return Contact.findOneAndUpdate({ contactId, owner: _id }, req.body, {
      new: true,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateStatusContact,
  updateContact,
};
