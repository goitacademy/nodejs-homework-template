const service = require("../../service/contacts");
const createError = require("http-errors");

const updateStatus = async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;
  if (Object.keys(body).length === 0) {
    next(createError(400, "missing field favorite"));
    return;
  }
  const updatedStatusOfContact = await service.updateContactStatus(
    contactId,
    body
  );
  if (updatedStatusOfContact) {
    res.status(200).json({ status: "success", data: updatedStatusOfContact });
  } else {
    next();
  }
};

module.exports = updateStatus;