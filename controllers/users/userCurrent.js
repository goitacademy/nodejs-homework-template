
const userCurrent = async (req, res, next) => {

   const {email, subscription} = req.user;
   
   res.json({
    email,
    subscription
   });
}

module.exports = userCurrent;