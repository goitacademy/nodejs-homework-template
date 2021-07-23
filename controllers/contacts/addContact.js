const { contact: service } = require("../../services");

const addContact = async (req, res, next) => {
  const { body } = req;
  try {
    const result = await service.addContact(body);
    if(!result){
      res.status(400).json({
        status: "error",
        code: 400,
        message: 'Bad request',
      })
    }
    res.status(201).json({
      status: "success",
      code: 201,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
