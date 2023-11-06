// services\contacts.js
const Contact = require("../models/contacts");

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

const getContactById = async (_id) => {
  try {
    const contact = await Contact.findById({ _id });
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
    console.log(error);
    return {
      success: false,
      result: null,
      message: error,
    };
  }
};

const addContact = async (Data) => {
  try {
    // const contactRegistered = await Contact.insertMany(Data);
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

const removeContact = async (_id) => {
  try {
    if (!_id) {
      return {
        success: false,
        result: null,
        message: "Invalid ID",
      };
    }
    const contactDelete = await Contact.findByIdAndDelete(_id);
    console.log(contactDelete);

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
    console.log(error);
    return {
      success: false,
      result: null,
      message: error,
    };
  }
};

const updateContact = async (contactId, body) => {
  try {
    if (!contactId) {
      return {
        success: false,
        result: null,
        message: "Invalid ID",
      };
    }
    // Verifica si el contactId es un ObjectId válido
    // if (!mongoose.Types.ObjectId.isValid(contactId)) {
    //   return {
    //     success: false,
    //     result: null,
    //     message: "Invalid ObjectId format",
    //   };
    // }
    const contactUpdate = await Contact.findByIdAndUpdate(contactId, body);
    console.log(contactUpdate);

    if (!contactUpdate) {
      return {
        success: false,
        result: null,
        message: "There was an error to update contact",
      };
    }

    return {
      success: true,
      result: contactUpdate,
      message: "Contact updated successfully.",
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

const updateStatusContact = async (contactId, favorite) => {
  try {
    if (!contactId) {
      return {
        success: false,
        result: null,
        message: "Invalid ID",
      };
    }
    const contact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );

    console.log(contact);

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
      message: "Favorite contac updated successfully.",
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
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
