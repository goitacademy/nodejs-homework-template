const service = require("../../service/service");

const addContact = async (req, res, next) => {
  try {
    const { body } = req;
    const newContact = await service.addContact(body);

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