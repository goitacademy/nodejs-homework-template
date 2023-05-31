const contactsOperations = require("../../models/contacts");

function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}

const addContact = async (req, res) => {
  let preparedBody = null;
  switch (false) {
    case isObjectEmpty(req.body):
      preparedBody = req.body;
      break;
    
    case isObjectEmpty(req.params):
      preparedBody = req.params;
      break;
    
    case isObjectEmpty(req.query):
      preparedBody = req.query;
      break;
    
    default:
      break
  }

  const newContact = await contactsOperations.addContact(preparedBody);
  res.status(201).json({ status: "succsess", code: 201, data: newContact });
};

module.exports = addContact;