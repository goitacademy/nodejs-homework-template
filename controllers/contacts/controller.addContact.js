const { addContact } = require("../../models/contacts");

exports.addContact = async (req, res, next) => {
  try {
    const body = req.body;
    const { name, phone, email } = req.body;

    if (!name) {
      return res.status(400).json({
        message: `missing required ${Object.keys(body)} field`,
      });
    }
    if (!email) {
      return res.status(400).json({
        message: `missing required email field`,
      });
    }
    if (!phone) {
      return res.status(400).json({
        message: `missing required phone  field`,
      });
    }
    res.status("201").json(await addContact(body));
  } catch (error) {
    // res.status(500).json({ error: error.message });
    next(error);
  }
};
