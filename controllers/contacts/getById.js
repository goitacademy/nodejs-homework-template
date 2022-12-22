const contactsOperations = require("../../models/contacts");

const getById = async (req, res, next) => {
  try {
    const id = req.params.contactId;

    const contactByID = await contactsOperations.getContactById(id);

    if (!contactByID) {
      const error = new Error(`Contact with this id: ${id} is not found`);
      error.status = 404;
      throw error;
    }
    res.json({
      status: "success",
      code: 200,
      result: { contactByID },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
