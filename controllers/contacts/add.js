const contactsModel = require("../../services/contacts");

const add = async (req, res) => {
  const {name, email, phone} = req.body;
  const contact = await contactsModel.add({name, email, phone});

  res
    .status(201)
    .json({
      data: {contact},
      message: `Contact by id: ${contact.id} has been added`,
    });
};

module.exports = add;
