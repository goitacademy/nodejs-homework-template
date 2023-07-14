const fs = require("fs").promises;

const { AppError, catchAsync } = require("../utils");

exports.checkContactsById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (id.length < 10) {
    // return res.status(400).json({
    //   msg: "Invalid ID..",
    // });
    throw new AppError(400, "Invalid ID..");
  }

  const contacts = JSON.parse(await fs.readFile("./models/contacts.json"));

  const contact = contacts.find((item) => item.id === id);

  if (!contact) {
    res.status(404).json({
      msg: "Contact does not exist..",
    });
  }

  req.contact = contact;

  next();
});
