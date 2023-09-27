const Contact = require("../../models/contacts");

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await Contact.findById(contactId);

    if (!result) {
      res.json({
        message: "Not found"
      });
      return;
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getById;