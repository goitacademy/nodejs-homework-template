/* eslint-disable quotes */
/* eslint-disable semi */
const contactsOperations = require("../../model");

const updateContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updateContact = await contactsOperations.updateContactById(
      contactId,
      req.body
    );
    if (!updateContact) {
      const error = new Error(
        `Can not update contact, because id=${contactId} not found.`
      );
      error.status = 404;
      // or use package "http-errors"
      throw error;
    }
    res.status(200).json({
      status: "success",
      code: 200,
      data: updateContact,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateContactById;
