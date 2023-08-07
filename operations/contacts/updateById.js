const contactsOperations = require("../../models/contacts");
const { contactValid } = require("../../helpers/");

const updateById = async (req, res, next) => {
  try {
    const { error } = contactValid.validate(req.body);
    if (error) {
      res.status(400).json({
        message: "missing fields",
      });
      return;
    }
    const { contactId } = req.params;
    const updatedContact = await contactsOperations.updateContact(
      contactId,
      req.body
    );
    if (!updatedContact) {
      res.status(404).json({
        message: "Not found",
      });
      return;
    }
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
