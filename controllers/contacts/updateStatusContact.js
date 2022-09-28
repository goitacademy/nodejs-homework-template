const { service } = require("../../service");

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;

  const favorite = Object.keys(body).find((item) => item === "favorite");

  if (Object.values(body).length !== 1 || !favorite) {
    res.json({
      status: 400,
      message: "missing field favorite",
    });
  } else {
    try {
      const result = await service.updateStatus(contactId, body);
      res.json({
        status: "success",
        code: 200,
        data: { contact: result },
      });
    } catch (e) {
      res.json({
        status: 400,
        message: "missing field favorite",
      });
    }
  }
};
module.exports = updateStatusContact;
