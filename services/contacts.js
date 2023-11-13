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
    // console.log(error);
    return {
      success: false,
      result: null,
      message: error,
    };
  }
};

const getContactOwnerById = async (owner, _id) => {
  try {
    const contact = await Contact.findOne({ owner, _id });

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
    // console.log(error);
    return {
      success: false,
      result: null,
      message: error,
    };
  }
};

const getContactCurrent = async (_id) => {
  try {
    // console.log("id:", _id);

    const contact = await Contact.findById({ _id });

    if (!contact) {
      return {
        success: false,
        result: null,
        message: `No contact found with id: ${_id}`,
      };
    }
    const { email, subscription } = contact;
    return {
      success: true,
      result: {
        email,
        subscription,
      },
      message: `Contact Found`,
    };
  } catch (error) {
    // console.log(error);
    return {
      success: false,
      result: null,
      message: error,
    };
  }
};

const removeContact = async (owner, _id) => {
  try {
    if (!_id) {
      return {
        success: false,
        result: null,
        message: "Invalid ID",
      };
    }
    const contactDelete = await Contact.findByIdAndDelete({_id, owner});
    // console.log(contactDelete);

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
    // console.log(error);
    return {
      success: false,
      result: null,
      message: error,
    };
  }
};

const updateContact = async (owner, _id, subscription) => {
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

    const contactUpdate = await Contact.findOneAndUpdate(
      { _id, owner },
      { subscription },
      { new: true }
    );
    // console.log(contactUpdate);

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
    // console.log(error);
    return {
      success: false,
      result: null,
      message: error,
    };
  }
};

const updateStatusContact = async (owner, _id, favorite) => {
  try {
    // console.log("id1; ", owner);
    // console.log("id12; ", _id);

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

    // console.log("serv", contact);

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
    // console.log(error);
    return {
      success: false,
      result: null,
      message: error,
    };
  }
};

const updateTokenRemove = async (_id, token) => {
  try {
    if (!_id) {
      return {
        success: false,
        result: null,
        message: "Not authorized",
      };
    }
    const contact = await Contact.findByIdAndUpdate(
      _id,
      { token },
      { new: true }
    );

    // console.log(contact);

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
      message: "No Content",
    };
  } catch (error) {
    // console.log(error);
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
  getContactCurrent,
  removeContact,
  updateContact,
  updateTokenRemove,
  updateStatusContact,
};
