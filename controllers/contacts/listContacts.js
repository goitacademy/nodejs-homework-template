const { Contact } = require("../../models");

const listContacts = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { page = 1, limit = 10, favorite = true && false } = req.query;
    const skip = (page - 1) * limit;
    const contacts = await Contact.find(
      { owner: _id, favorite },
      "-createdAt -updatedAt",
      {
        skip,
        limit: Number(limit),
      }
    ).populate("owner", "name email");
    res.json({
      status: "success",
      code: 200,
      data: {
        result: contacts,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Server error",
    });
  }
};

module.exports = listContacts;
