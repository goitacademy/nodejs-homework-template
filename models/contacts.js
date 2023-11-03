const Contact = require("./Schemas/Schema");

const pagination = async (page, limit) => {
  try {
    const contacts = await Contact.find();
    const noOwnerContact = contacts.filter((c) => !c.owner);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedContacts = noOwnerContact.slice(startIndex, endIndex);
    const data = {
      page,
      limit,
      totalContacts: noOwnerContact.length,
      data: paginatedContacts,
    };
    return data;
  } catch (error) {
    console.error("Error to read contacts:", error);
    throw error;
  }
};

const listContacts = async () => {
  try {
    const contact = await Contact.find;
    return contact;
  } catch (e) {
    console.log("Something went wrong please try again later!");
  }
  throw Error;
};
const favouriteContactsList = async (favourite) => {
  try {
    const contacts = await Contact.find();
    const value = JSON.parse(favourite.toLowerCase());
    if (typeof value === "boolean") {
      const favouriteContacts = contacts.filter((c) => c.favourite === value);
      const data = {
        totalContacts: favouriteContacts.length,
        data: favouriteContacts,
      };
      return { status: 200, data };
    } else {
      return { status: 400, data: "Bad Request" };
    }
  } catch (error) {
    console.error("Error reading contacts:", error);
    throw error;
  }
};

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
    return { statusCode: 400, message: "Please verify required fields!" };
  }
};

const updateContact = async (contactId, body) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
      new: true,
    });
    return { statusCode: 200, message: updatedContact };
  } catch (e) {
    console.log(e.message);
    return { statusCode: 400, message: "Invalid contactId!" };
  }
};

const updateContactStatus = async (contactId, body) => {
  try {
    if (typeof body.favourite !== "boolean") {
      return { statusCode: 400, message: "Invalid favourite field!" };
    }
    const updatedStatus = await Contact.findByIdAndUpdate(
      contactId,
      { favourite: body.favorite },
      { new: true }
    );
    return { statusCode: 200, message: updatedStatus };
  } catch (e) {
    console.log(e.message);
    return { statusCode: 400, message: "Invalid contactId!" };
  }
};

module.exports = {
  listContacts,
  favouriteContactsList,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContactStatus,
  pagination,
};
