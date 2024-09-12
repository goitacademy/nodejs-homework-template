const Contact = require("./Schema");

async function listContacts() {
  try {
    const contact = await Contact.find;
    return contact;
  } catch (e) {
    console.log("Something went wrong please try again later!", e);
  }
  throw Error;
}

const getContactById = async (contactId) => {
  try {
    const contact = await Contact.findById(contactId);
    return contact;
  } catch (e) {
    console.log(e);
    return { message: "No contact was found!" };
  }
};

const removeContact = async (contactId) => {
  try {
    const contact = await Contact.findByIdAndRemove(contactId);
    if (!contact) {
      return { message: "Contact id does not exist!" };
    }
    return { message: "Contact was deleted!" };
  } catch (e) {
    console.log(e.message);
  }
};

const addContact = async (body) => {
  try {
    await Contact.create(body);
    const newContacts = await Contact.find();
    return { statusCode: 200, message: newContacts };
  } catch (e) {
    console.log(e.message);
    return {
      statusCode: 400,
      message: { message: "Please verify required fields!" },
    };
  }
};

const updateContact = async (contactId, body) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
      new: true,
    });
    return { statusCode: 200, message: updatedContact };
  } catch (error) {
    console.log(error.message);
    return { statusCode: 400, message: "Invalid contactId" };
  }
};
const updateContactStatus = async (contactId, body) => {
  try {
    if (typeof body.favorite !== "boolean") {
      return { statusCode: 400, message: "Invalid favorite field" };
    }
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite: body.favorite },
      {
        new: true,
      }
    );
    return { statusCode: 200, message: updatedContact };
  } catch (error) {
    console.log(error.message);
    return { statusCode: 400, message: "Invalid contactId" };
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContactStatus,
};
