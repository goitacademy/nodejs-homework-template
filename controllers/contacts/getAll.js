const {contacts}=require('../../models')
const getAll=async (req, res, next) => {
      const allContacts = await contacts.listContacts();
      res.json({
        status: "success",
        code: 200,
        data: { allContacts },
      });
  }

  module.exports=getAll