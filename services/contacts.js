// services\contacts.js
const { Contact } = require("../models/contacts");
// const util = require('util');

const getContactOwner = async (query, skip, limit) => {
  try {
    const contact = await Contact.find(query).skip(skip).limit(limit);

    if (!contact) {
      return {
        success: false,
        result: null,
        message: `No contacts found for owner:`,
      };
    }
    return {
      success: true,
      result: contact,
      message: `Contacts Found`,
    };
  } catch (error) {
    return {
      success: false,
      result: null,
      message: error,
    };
  }
};

const getContactOwnerById = async (_id, owner) => {
  try {
    const contact = await Contact.findById({ _id, owner });

    if (!contact) {
      return {
        success: false,
        result: null,
        message: `No contact found with id: ${_id}`,
      };
    }
    return {
      success: true,
      result: contact,
      message: `Contact Found`,
    };
  } catch (error) {
    return {
      success: false,
      result: null,
      message: error,
    };
  }
};

const removeContact = async (_id, owner) => {
  try {
    if (!_id) {
      return {
        success: false,
        result: null,
        message: "Invalid ID",
      };
    }
    const contactDelete = await Contact.findByIdAndDelete({ _id, owner });

    if (!contactDelete) {
      return {
        success: false,
        result: null,
        message: "Contact not found",
      };
    }

    return {
      success: true,
      result: contactDelete,
      message: "Contact deleted successfully.",
    };
  } catch (error) {
    return {
      success: false,
      result: null,
      message: error,
    };
  }
};

const updateFavoriteContact = async (_id, favorite, owner) => {
  try {
    if (!_id) {
      return {
        success: false,
        result: null,
        message: "Invalid ID",
      };
    }
    const contact = await Contact.findOneAndUpdate(
      {
        _id,
        owner,
      },
      { favorite },
      { new: true }
    );

    if (!contact) {
      return {
        success: false,
        result: null,
        message: "Not found contact",
      };
    }

    return {
      success: true,
      result: contact,
      message: "Favorite contact updated successfully.",
    };
  } catch (error) {
    return {
      success: false,
      result: null,
      message: error,
    };
  }
};

// list contact
const listContacts = async () => {
  try {
    const contacts = await Contact.find();

    return {
      success: true,
      result: contacts,
      message: "List of Contacts",
    };
  } catch (error) {
    return {
      success: false,
      result: null,
      message: error,
    };
  }
};

const addContact = async (Data) => {
  try {
    // console.log('dT', Data);

    const email = Data.email;
    const contact = await Contact.insertMany({
      // const contact = await Contact.findOne({
      email,
    });
    // console.log(contact);
    if (contact) {
      return {
        success: false,
        result: null,
        // message:  `Contact is already registered:\n${util.inspect(contact, { depth: null, colors: true })}`,
        message: `contact is already registered with this email: ${contact.email} *-* ${contact.name} `,
      };
    }
    
    const contactRegistered = await Contact.create(Data);
    console.log(contactRegistered);
    //     const newId = crypto.randomUUID();

    if (!contactRegistered) {
      return {
        success: false,
        result: null,
        message: "There is an error try creating contact.",
      };
    }

    return {
      success: true,
      result: contactRegistered,
      message: "Contact registered successfully.",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      result: null,
      message: error,
    };
  }
};

module.exports = {
  // Contact
  listContacts,
  addContact,
  // User
  getContactOwner,
  getContactOwnerById,
  removeContact,
  updateFavoriteContact,
};
