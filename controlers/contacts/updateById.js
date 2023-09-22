const { updateContact } = require("../../models/contacts");

const updateById = async (req, res, next) => {
  let { name, email, phone } = req.body;
  let id = req.params.contactId;

  if (!name) {
    res.status(400).json({ message: "missing required Name field" });
  } else if (!email) {
    res.status(400).json({ message: "missing required Email field" });
  } else if (!phone) {
    res.status(400).json({ message: "missing required Phone field" });
  } else if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Missing fields" });
  } else {
    let result = await updateContact(id, { name, email, phone });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  }
  next();
};

module.exports = updateById;
