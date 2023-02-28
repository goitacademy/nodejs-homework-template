const { updateStatusContact } = require("../models/contacts");
const { schema } = require("../schema/joiSchema");

const updateStatusController = async (req, res) => {
  
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const { contactId } = req.params;
    const { favorite } = req.body;

    

    const updatedStatus = await updateStatusContact(contactId, {
      favorite,
    });

    if (favorite === null) {
      return res.status(400).json({ message: "Missing field favorite" });
    }

    !updatedStatus
      ? res
          .status(404)
          .json({ message: `Contact by ID ${contactId}: not found` })
      : res.status(200).json(updatedStatus);
  
};

module.exports = {
  updateStatusController,
};
