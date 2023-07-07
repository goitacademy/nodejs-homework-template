const { Contact } = require("../../models/contact");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite = "" } = req.query;
  const skip = (page - 1) * limit;

  let result;
  let qty;

  if (favorite !== "") {
    const allResult = await Contact.find({ owner, favorite });
    qty = allResult.length;

    result = await Contact.find({ owner, favorite }, "-createdAt -updatedAt", {
      skip,
      limit,
    }).populate("owner", "email subscription ");
  } else {
    const allResult = await Contact.find({ owner });
    qty = allResult.length;

    result = await Contact.find({ owner }, "-createdAt -updatedAt", {
      skip,
      limit,
    }).populate("owner", "email subscription ");
  }

  res.status(200);
  res.json({
    code: 200,
    message: "Success",
    data: result,
    qty,
  });
};

module.exports = listContacts;
