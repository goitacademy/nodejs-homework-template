const { addContact } = require("../../models/contacts");

exports.addContact = async (req, res, next) => {
  try {
    const body = req.body;
    const { name, phone, email } = req.body;

    if (!name && !phone && !email) {
      return res.status(400).json({ message: "missing fields" });
    }
    res.status("201").json(await addContact(body));
  } catch (error) {
    // res.status(500).json({ error: error.message });
    next(error);
  }
};
