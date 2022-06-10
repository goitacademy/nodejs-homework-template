const { Contact } = require("../../models/contact");

const updateStatus = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;
    const updatedStatusContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );
    if (!updatedStatusContact) {
      res.status(404).json({ message: "Not found" });
    } else {
      res.status(200).json(updatedStatusContact);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = updateStatus;
