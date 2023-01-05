const Contact = require('../../models/contact');

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  
  const contacts = await Contact.find({ owner }, "-createdAt -updateAt", { skip, limit })
    .populate("owner", "name email");
  
    res.json({
      status: "success",
      code: 200,
      data: {
        result: contacts
      }
    })
};

module.exports = getAllContacts;