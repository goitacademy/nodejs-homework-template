const createError = require('../utils/createError');
const ERROR_TYPES = require('../constants/errors');
const ContactModel = require("./contactShema");
const validateObjectId = require('../express/middlewares/validateByMongoose');


const listContacts = async () => {
  const contacts = await ContactModel.find();
  return contacts;
};

const getContactById = async (contactId) => {

  validateObjectId(contactId);

  const contact = await ContactModel.findById(contactId);
  if (!contact) {
    const error = createError(ERROR_TYPES.NOT_FOUND, {
      message: "Not found",
    });
    throw error;
  }
  return contact;
};

const removeContact = async (contactId) => {

  validateObjectId(contactId);

  const contactToRemove = await ContactModel.findByIdAndRemove(contactId);
  
  if (!contactToRemove) {
    const error = createError(ERROR_TYPES.NOT_FOUND, {
      message: "Not found",
    });
    throw error;
  }
  
  const newContacts = await ContactModel.find();
  return newContacts;
};

const addContact = async (body) => {
  const contact = new ContactModel(body);
  await contact.save();
  return contact;
};


const updateContact = async (contactId, body) => {

  validateObjectId(contactId);

  const updatedContact = await ContactModel.findByIdAndUpdate(contactId, {
    $set: {
      ...body,
    }
  }, { returnOriginal: false },
  );
  if (!updatedContact) {
    const error = createError(ERROR_TYPES.NOT_FOUND, {
      message: "Not found",
    });
    throw error;
  };
  return updatedContact;
};

const updateStatusContact = async (contactId, body) => {

  validateObjectId(contactId);
  
  if (!body || body.favorite === undefined) {
    const error = createError(ERROR_TYPES.BAD_REQUEST, {
      message: "missing field favorite",
    });
    throw error;
  };
  const updatedContact = await ContactModel.findByIdAndUpdate(
    contactId,
    {
      $set: {
        favorite: body.favorite,
      },
    },
    { new: true }
  );

  if (!updatedContact) {
    const error = createError(ERROR_TYPES.NOT_FOUND, {
      message: "Not found",
    });
    throw error;
  };

  return updatedContact;
};


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
}
