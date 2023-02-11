// const createError = require("http-errors");
const { Contact } = require("../../models");

const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;

    const contactById = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );

    if (!contactById) {
      // throw createError(404, `Contact with id=${contactId} not found.`);

      // const error = new Error("Not found");
      // error.status = 404;
      // throw error;

      res.status(404).json({
        status: "Error",
        code: 404,
        message: "Not found",
      });
      return;
    }

    res.json({
      status: "Success",
      code: 200,
      data: { result: contactById },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateStatusContact;
