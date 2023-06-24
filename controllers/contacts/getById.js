const getContactById = require("../../service/contacts/getContactById");

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await getContactById(contactId);
    if (contact) {
      console.log(
        `Contact with id: ${contactId} was successfully found in the contact database.`
      );
      res.status(200).json({
        status: "success",
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      console.log(
        `Contact with id: ${contactId} was not found in the contact database.`
      );
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact with id: ${contactId}`,
        data: "Not found",
      });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {getById};
