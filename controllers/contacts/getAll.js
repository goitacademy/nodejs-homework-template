<<<<<<< HEAD
const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite = false } = req.query;
  const skip = (page - 1) * limit;
  const getByCondition = { owner: _id };
  if (favorite === "true") {
    getByCondition.favorite = true;
  }
  if (favorite === "false") {
    getByCondition.favorite = false;
  }
  const contacts = await Contact.find(getByCondition, "", {
    skip,
    limit,
  });
=======
const Contact = require("../../models/contact");

const getAll = async (req, res) => {
  const contacts = await Contact.find();
>>>>>>> f897728d66c7cfeaa230c21584b96a891cbf5b99
  res.json({
    status: "success",
    code: "200",
    data: {
      result: contacts,
    },
  });
};

module.exports = getAll;