<<<<<<< HEAD
const { Contact } = require("../../models/contacts");
const { createError } = require("../../middlewares");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
=======
const contactsOperations = require("../../models/contacts");
const { createError } = require("../../helpers");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsOperations.getContactById(contactId);
>>>>>>> 2e7b20b03c67d57065d0ce30119fda3b69001c54
  if (!result) {
    throw createError(404, `contact with id=${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
<<<<<<< HEAD
};

module.exports = getContactById;
=======
}

module.exports = getContactById;

  
>>>>>>> 2e7b20b03c67d57065d0ce30119fda3b69001c54
