const ContacModel = require("../services/shema");
const checkContactById = require("../services/checkContactById");

const listContacts = async () => {
  const data = await ContacModel.find({});
  return data;
};

const getContactById = async (contactId) => {
  const isExist = await checkContactById(contactId);
  if (isExist) {
    const data = await ContacModel.findById(contactId);
    return data;
  } else {
    return `There is not exist contact with id: ${contactId}`;
  }
};

const removeContact = async (contactId) => {
  const data = await ContacModel.deleteOne({ _id: contactId })
    .then((result) => {
      if (result.deletedCount) {
        console.log("The contact was deleted successfully");
      } else {
        console.log("There is not such contact");
        return `There is not exist contact with id: ${contactId}`;
      }
      return result.deletedCount;
    })
    .catch((error) => {
      console.log(error);
    });
  return data;
};

const addContact = async (body) => {
  const contact = new ContacModel(body);
  const data = await contact
    .save()
    .then(() => {
      console.log("Contact added to the database!");
      return "Contact added to the database!";
    })
    .catch((error) => {
      console.log(error);
    });
  return data;
};

const updateContact = async (contactId, body) => {
  const isExist = await checkContactById(contactId);
  if (isExist) {
    const data = await ContacModel.findOneAndUpdate({ _id: contactId }, body, {
      new: true,
    });
    return data;
  } else {
    return `There is not exist contact with id: ${contactId}`;
  }
};

const toggleFavoriteContact = async (contactId) => {
  const isExist = await checkContactById(contactId);
  if (isExist) {
    const contact = await ContacModel.findById(contactId);
    const data = await ContacModel.findOneAndUpdate(
      { _id: contactId },
      { favorite: !contact.favorite },
      { new: true }
    );
    return data;
  } else {
    return `There is not exist contact with id: ${contactId}`;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  toggleFavoriteContact,
};
