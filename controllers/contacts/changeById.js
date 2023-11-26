const contactOperation = require("../../models/contacts");

const changeById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactOperation.updateContact(contactId, req.body);
    console.log(result);
    if (!result) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = changeById;
