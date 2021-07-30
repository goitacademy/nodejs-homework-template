const { contact: service } = require("../../services");

const listContacts = async (req, res, next) => {
  try {
    const result = await service.listContacts();
    res.status(200).json({
      status: "success",
      code: 200,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = listContacts;
