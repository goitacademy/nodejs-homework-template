const ContactsModel = require("../model");

const getContactById = async (req, res) => {
  try {
    console.log(2);
    const { contactId } = req.params;
    const contact = await ContactsModel.getContactById(contactId);

    if (!contact) {
      res.status(404).json({
        status: "error",
        code: 404,
        data: {
          message: `Contact with id '${contactId}'not found`,
        },
      });
    } else {
      res.json({
        status: "success",
        code: 200,
        data: {
          result: contact,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = getContactById;
