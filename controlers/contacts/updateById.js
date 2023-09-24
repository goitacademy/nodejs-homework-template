const { updateContact } = require("../../models/contacts");

const updateById = async (req, res, next) => {
  let { name, email, phone } = req.body;
  let id = req.params.contactId;

  let result = await updateContact(id, { name, email, phone });
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).json({ message: "Not found" });
  }
  // }
  next();
};

module.exports = updateById;
