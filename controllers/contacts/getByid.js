const { getContactById } = require("../../models/contacts");

const getByid = async (req, res, next) => {
  try {
    const requestId = req.params.contactId;
    const contact = await getContactById(requestId);

    if (!contact) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    } else {
      res.status(200).json({ data: { contact } });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = getByid;
