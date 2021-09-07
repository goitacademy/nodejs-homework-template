const { contacts: service } = require("../../services");

const listContacts = async (req, res, next) => {
  try {
    const result = await service.listContacts();
    res.json({
      status: "sucess",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = listContacts;
