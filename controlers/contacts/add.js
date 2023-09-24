const { addContact } = require("../../models/contacts");

const add = async (req, res, next) => {
  // let { name, email, phone } = req.body;

  //   if (!name) {
  //     res.status(400).json({ message: "missing required Name field" });
  //   } else if (!email) {
  //     res.status(400).json({ message: "missing required Email field" });
  //   } else if (!phone) {
  //     res.status(400).json({ message: "missing required Phone field" });
  //   } else {
  //     let newContact = await addContact({ name, email, phone });
  //     res.status(201).json(newContact);
  //   }
  // };

  let newContact = await addContact({ name, email, phone });
  res.status(201).json(newContact);
};

module.exports = add;
