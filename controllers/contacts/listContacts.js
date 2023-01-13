
const Contact = require("../../models/contacts");

const listContacts = async (req, res, next) => {
  const { _id } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;

  const contact = await Contact.find({owner: _id}, "", {skip, limit: Number(limit)}).populate("owner", "name email subscription");
      res.json({
        status: "OK",
        code: 200,
          ResponseBody: {
             contact
            }
    })
  
}

module.exports = listContacts;