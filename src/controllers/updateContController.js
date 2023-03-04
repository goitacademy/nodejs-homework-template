const contactOperations = require("../models/contacts");
const schema = require("../service/schemas/validation");

const { updateContact } = contactOperations;

const updateCont = async (req, res, next) => {
  const contactId = req.params.id;
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return () => {
      res.status(400).json({
        status: 400,
        message: "missing required name field",
      });
    };
  } else if (contactId) {
    try {
      const value = await schema.validateAsync({ name, email, phone });
      const updatedContact = await updateContact(contactId, value);
      return res.status(200).json({
        status: 200,
        data: {
          updatedContact,
        },
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.log(error.message);
    }
  } else {
    return () => {
      res.status(404).json({
        status: 404,
        message: "Not found",
      });
    };
  }
};

module.exports = updateCont;
