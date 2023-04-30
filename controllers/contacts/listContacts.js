const {Contact} = require("../../models");

const listContacts = async (req, res) => {
    const {_id: owner} = req.user;
   const {page=1, limit=10, favorite} = req.query;
   const skip = (page -1) * limit;

   const filter = favorite ? { owner, favorite } : { owner }; 

   const contacts = await Contact.find(filter, "-createdAt -updatedAt", {
   skip, 
   limit: Number(limit)})
   .populate("owner", "name email subscription");
  //  const contacts = await Contact.find({})   
   res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
};

module.exports = listContacts;