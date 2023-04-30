 const {User} = require("../../models");

const getCurrent = async(req, res) => {
   //   console.log(req.user);
     const { name, subscription, email } = req.user;
    res.json({
      status: "success",
      code: 200,
      data: {
         user: {
               name,
               email, 
               subscription             
         }
      }
   })
 }

module.exports = getCurrent;