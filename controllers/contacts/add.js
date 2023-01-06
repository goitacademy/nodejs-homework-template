const { Contact } = require("../../models/contact");

const { schemaJoi } = require("../../models/contact");

const add = async (req, res) => {
  const body = req.body;
  const { error } = schemaJoi.validate(body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  const newContact = await Contact.create(body);
  res.status(201).json(newContact);
};

module.exports = add;
