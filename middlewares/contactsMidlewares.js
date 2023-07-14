const fs = require("fs").promises;

exports.checkContactsById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (id.length < 10) {
      return res.status(400).json({
        msg: "Invalid ID..",
      });
    }

    const contacts = JSON.parse(await fs.readFile("./models/contacts.json"));

    const contact = contacts.find((item) => item.id === id);

    if (!contact) {
      res.status(404).json({
        msg: "Contact does not exist..",
      });
    }

    req.contact = contact;

    next();
  } catch (error) {
    console.log(error);

    res.sendStatus(500);
  }
};
