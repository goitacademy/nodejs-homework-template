const contactOperations = require("../models/contacts");

const { removeContact } = contactOperations;

const delContact = async (req, res, next) => {
  const contactId = req.params.id;
  if (!contactId) {
    return () => {
      res.status(400).json({
        message: "Not found",
        status: 404,
      });
      next();
    };
  } else {
    const contacts = await removeContact(contactId);
    return res.status(200).json({
      message: "contact deleted",
      status: 200,
      data: {
        contacts,
      },
    });
  }
};

module.exports = delContact;
