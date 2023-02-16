const { Schema, model } = require('mongoose');

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = model('contact', contactSchema);

const listContacts = async body => {
  try {
    const { owner, page, limit, favorite } = body;
    const skip = (page - 1) * limit;
    const result = await Contact.find({ owner, favorite }, '', {
      skip,
      limit: Number(limit),
    }).populate('owner', '_id email subscription');

    return result;
  } catch (error) {
    console.error(error.message);
  }
};

const getContactById = async contactId => {
  try {
    const result = await Contact.findById(contactId);

    return result;
  } catch (error) {
    console.error(error.message);
  }
};

const addContact = async body => {
  try {
    const { name, email, phone, owner } = body;

    const result = await Contact.create({ name, email, phone, owner });
    return result;
  } catch (error) {
    console.error(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const result = Contact.findByIdAndUpdate({ _id: contactId }, body, {
      new: true,
    });
    return result;
  } catch (error) {
    console.error(error.message);
  }
};

const removeContact = async contactId => {
  try {
    const result = await Contact.findByIdAndRemove({ _id: contactId });
    return result;
  } catch (error) {
    console.error(error.message);
  }
};

const updateContactElement = async (contactId, body) => {
  try {
    const { owner, favorite } = body;
    const result = Contact.findByIdAndUpdate(
      { _id: contactId, owner: owner },
      { favorite },
      {
        new: true,
      }
    );
    return result;
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContactElement,
};
