const { Contact } = require("../../models/contact");

const updateById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      {
        name,
        email,
        phone,
      },
      { new: true }
    );
    if (!updatedContact) {
      res.status(404).json({ message: "contact not found" });
    } else {
      res.status(200).json(updatedContact);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
