const Contact = require("../../model/contacts");

const addContact = async (req, res, next) => {
  try {
    const { body } = req;
    const { id: owner } = req.user;

    const newContact = await Contact.create({ ...body, owner });

    res.json({
      status: "success",
      code: 201,
      data: {
        contact: newContact,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: "Phone and e-mail must be unique",
    });
  }
};

module.exports = addContact;
