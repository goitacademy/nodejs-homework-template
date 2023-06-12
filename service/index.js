const { Contact } = require("./schemas/contact.js");

const listContacts = async () => {
  try {
    const count = await Contact.countDocuments({});
    const response = await Contact.find({});
    if (count === 0) {
      console.log("There is no contact in the contact database yet.");
    }

    console.log(`There are ${count} contacts in the contact database`);

    return { status: "200", response };
  } catch (error) {
    return { status: "ERROR", response: error.message };
  }
};

const getContactById = async (id) => {
  
  try {
  const contact = await Contact.findById(id);
  console.log(contact);
    if (contact === null) {
  
      return { status: "404", response: "Not found" };
    }
   
    return { status: "200", response: contact };
  } catch (error) {
    return { status: "ERROR", response: error.message };
  }
};

const addContact = async ({ name, email, phone }) => {
  try {
    const response = await Contact.create({ name, email, phone });

    return { status: "201", response };
  } catch (error) {
    return { status: "ERROR", response: error.message };
  }
};

const removeContact = async (id) => {
  try {
    const response = await Contact.findByIdAndDelete(id);

    if (!response) {
      return { status: "404", response: "Not found" };
    }
    return { status: "200", response };
  } catch (error) {
    return { status: "ERROR", response: error.message };
  }
};

const updateContact = async (id, body) => {
  try {
    const response = await Contact.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!response) {
      return { status: "404", response: "Not found" };
    }

    return { status: "200", response };
  } catch (error) {
    return { status: "ERROR", response: error.message };
  }
};

const updateFavoriteById = async (id, favorite) => {
  try {
    const response = await Contact.findByIdAndUpdate(
      id,
      { favorite },
      { new: true }
    );

    if (!response) {
      return { status: "404", response: "Not found" };
    }

    return { status: "200", response };
  } catch (error) {
    return { status: "ERROR", response: error.message };
  }
};
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFavoriteById,
};