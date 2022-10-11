const {User} = require('../../models/user');

const getCurrent = async(req, res) => {
const {email, subscription} = req.user;

if(!email) {
   return res.status(401).json({ message: 'Not authorized' });
}

res.json({
   status: "succces",
   code: 200,
   data: {
      user: {
         email,
         subscription,
       
      }
   }
})
}



module.exports = getCurrent;