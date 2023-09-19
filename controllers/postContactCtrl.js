const Contact = require("../models/model_contact");

const postContactCtrl = async (req, res) => {
  const addContact = await Contact.create(req.body);
  res.status(201).json({
    status: "Success",
    code: 201,
    data: {
      result: addContact,
    },
  })
};

module.exports = postContactCtrl