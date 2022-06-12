const { Contact } = require("../../models");
const { NotFound } = require("http-errors");

const getContactById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
      throw new NotFound(`Contact with id "${contactId}" not found!`);
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
};

module.exports = getContactById;
