const contactsOperations = require("../../model/contacts");

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsOperations.getContactById(
      Number(contactId) || contactId
    );
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json({
      status: "success",
      code: 200,
      data: { contact },
    });
  } catch (e) {
    next(e);
  }
};

module.exports = getContactById;
