const { joiContactSchema } = require("../../validation");
const updateContact = require("../../model/contacts/updateContact");

const updateById = async (req, res, next) => {
  try {
    const { error } = joiContactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
    const { contactId } = req.params;
    const updateConract = await updateContact(contactId, req.body);
    if (!req.body) {
      return res.status(404).json({
        message: "missing fields",
      });
    }
    res.json({
      updateConract,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
