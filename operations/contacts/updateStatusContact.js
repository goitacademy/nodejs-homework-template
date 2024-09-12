const { Contact } = require("../../models");
const { contactsStatusValid } = require("../../helpers");

const updateStatusContact = async (req, res, next) => {
  try {
    const { error } = contactsStatusValid(req.body);
    if (error) {
      res.status(400).json({
        message: "missing field favorite",
      });
      return;
    }
    const { contactId } = req.params;
    const { favorite } = req.body;
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
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

module.exports = updateStatusContact;
