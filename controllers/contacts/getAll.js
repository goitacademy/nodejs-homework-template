const {Contact}=require("../../models/contact.js")
const getAll=async (req, res, next) => {
  const{page, limit, favorite}=req.query
  const skip=(page - 1) * limit
  const {_id:owner}=req.user;
      const allContacts =await Contact.find(favorite?{owner, favorite}:{owner} , '-updatedAt -createdAt -__v', {skip, limit:Number(limit)}).populate('owner', '-_id email subscription').exec();
      res.json({
        status: "success",
        code: 200,
        total:allContacts.length,
        data: { allContacts },
      });
  }

  module.exports=getAll