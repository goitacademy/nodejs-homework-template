const contactOperations = require("../../models");

const update = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactOperations.updateContact(contactId, req.body);
    if (!result) {
          return res.status(404).json({ message: "Bad request" })
    }
    res.json({
      status: "Success",
      code: 200,
      message: "contact updated",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = update;