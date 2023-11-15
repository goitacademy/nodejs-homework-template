const { Contact } = require("../model/contact");

async function getContactsPage(pageNumber, perPage) {
  try {
    const options = {
      page: pageNumber,
      limit: perPage,
    };

    const result = await Contact.paginate({}, options);

    return result;
  } catch (error) {
    console.error("Error contact page:", error);
    throw error;
  }
}

const pageNumber = 1;
const perPage = 20;
getContactsPage(pageNumber, perPage)
  .then((result) => {
    console.log("Contact page:", result);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

const listContacts = async (userId, filters = {}) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const { favorite } = filters;
    const query = { user_id: userId };

    if (favorite === "true") {
      query.favorite = true;
    }

    const contacts = await Contact.find(query);
    return contacts;
  } catch (error) {
    throw error;
  }
};

const getContactById = async (id) => {
  const contact = await Contact.findById(id);
  return contact;
};

const addContact = async (data, userId) => {
  const newContact = await Contact.create({ ...data, user_id: userId });
  return newContact;
};

const updateContacts = async (id, data) => {
  const result = await Contact.findByIdAndUpdate(id, data, { new: true });
  return result;
};

const removeContact = async (id) => {
  const result = await Contact.findByIdAndRemove(id);
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContacts,
};
