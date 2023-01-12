const listContacts = require("../../models/contactsModels");

// let contacts = [];
// const contacts = [
//   { id: "1", topic: "test1", text: "test text1" },
//   { id: "2", topic: "test2", text: "test text2" },
//   { id: "3", topic: "test3", text: "test text3" },
// ];

const getContacts = (req, res) => {
  //   contacts = () => {
  //     listContacts();
  //   };
  //   listContacts();
  const contacts = listContacts();

  //   res.json(listContacts());

  res.json({
    contacts,
    code: 200,
    status: "success",
  });
  //   return contacts;
};

module.exports = {
  getContacts,
};
