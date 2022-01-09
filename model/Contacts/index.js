const Contacts = require("./schema");

const getContact = async () => {
  const result = await Contacts.find();
  console.log("All contacts: ", result);
};

const addContact = async (data) => {
  const result = await Contacts.create(data);
  console.log("new contact: ", result);
};

module.exports = {
  getContact,
  addContact,
};
// const contact = new Contact({ name: "Terminator", email: "termik@gmail.com", phone: "+9977887788" });

// const result = contact.save();
// console.log("Терминатор внедрён в базу! ", result);
// const allDB = contact.find();
// console.log("all DB: ", allDB);
