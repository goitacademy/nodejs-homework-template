// services\contacts.js
const Contact = require("../models/contacts");

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

const updateContactSubscription = async (_id, subscription, owner) => {
  try {
    if (!_id) {
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

    const contactUpdate = await Contact.findByIdAndUpdate(
      { _id, owner },
      { subscription },
      { new: true }
    );

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
    return {
      success: false,
      result: null,
      message: error,
    };
  }
};

const updateStatusContact = async (_id, favorite, owner) => {
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

module.exports = {
  getContactOwner,
  getContactOwnerById,
  removeContact,
  updateContactSubscription,
  updateStatusContact,
};
