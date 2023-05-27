const Contact = require("../models/contact");

async function putContact(req, res, next) {
  try {
    const id = req.params.contactId;
    const { name, email, phone } = req.body;
    const newData = { id, name, email, phone };
    if (!Object.values(newData).length) {
      return res.status(400).json({ message: "missing fields" });
    }
    const result = await Contact.findByIdAndUpdate(id, newData, { new: true });
    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = putContact;
