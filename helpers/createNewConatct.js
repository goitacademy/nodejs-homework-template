const { v4: uuidv4 } = require("uuid");
const createNewContact = ({ name, email, phone }) => {
  return {
    id: uuidv4(),
    name,
    email,
    phone,
  };
};
module.exports = createNewContact;
