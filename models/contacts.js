const { model, Schema  } = require('mongoose');

const contactSchema = new Schema(
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
  }
},
{
  timestamps: true,
  versionKey: false,
}

);
const Contact = model('Contact', contactSchema)

const listContacts = async () => {
  try {
    const contacts = await Contact.find();
    console.log('Contacts:', contacts);
    return contacts;
  } catch (error) {
    console.error(error.massage);
    return [];
  }
};

const getContactById = async (contactId) => {
  try {
    console.log('Searching for contact with ID:', contactId);
    const contact = await Contact.findById(contactId)
    console.log('Result:', contact);
    return contact || null;
  } catch (err) {
    console.error(err.massage);
    return null;
  }
};

const removeContact = async (contactId) => {
  try {
    const removedContact = Contact.findByIdAndDelete(contactId);
    if (!removedContact) {
      console.warn("Contact not found");
      return null;
    }
    return removedContact;
  } catch (err) {
    console.error(err.massage);
    return null;
  }
};

const addContact = async (body) => {
  try {
    const newContact = await Contact.create(body)
    return newContact;
  } catch (err) {
    console.error(err.massage);
    return null;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const updatedContact = Contact.findByIdAndUpdate(contactId,
      {$set: body},
      {new: true});
    if (!updatedContact) {
      console.warn("Contact not found");
      return null;
    }
       return updatedContact;
  } catch (err) {
    console.error(err.massage);
    return null;
  }
};

const updateStatusContact = async (contactId, { favorite }) => {
  try {
    // const { contactId } = req.params;
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { $set: { favorite } },
      { new: true }
    );
      if(!updatedContact) {
        console.warn("Contact not found");
        return null;
      }
      return updatedContact;
  } catch (err) {
    console.error(err.massage);
    return null;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  contactSchema,
  updateStatusContact
};