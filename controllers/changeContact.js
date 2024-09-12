const { updateContact } = require("../models/contacts");
const { schema } = require("../schemas/joiSchema");

const changeContact = async (req, res) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(500).json({ message: "Missing fields" });
    }

    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    const updatedContact = await updateContact(contactId, {
      name,
      email,
      phone,
    });

    !updatedContact
      ? res
          .status(404)
          .json({ message: `Contact by ID ${contactId}: not found` })
      : res.status(200).json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: `${error.message}` });
  }
};

module.exports = {
  changeContact,
};
