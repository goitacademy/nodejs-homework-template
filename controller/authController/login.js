 const UserSchema = require("../../models/userSchema");
 const jwt = require("jsonwebtoken");
const loginServices =require('../../services/authServise/loginServices')
require("dotenv").config();
const secret = process.env.SECRET


const login = async(req, res, next)=>{
    const { email, password } = req.body;
    // const { contactId } = req.params;
    try {
      // const user = await UserSchema.findOne({ email });
// if(user){
//   return res.status(409).json({
//     message: "conflict email"
//   })
// // }
//       if (!user || !user.validPassword(password)) {
//         return res.status(400).json({
//           status: "error",
//           code: 400,
//           message: "Incorrect login or password",
//           data: "Bad request",
//         });
//       }

      // const { _id: id } = user;

      // const token = jwt.sign({ id }, secret, { expiresIn: "1h" });
      const token = await loginServices(email,password)
      res.status(200).json({
        status: "OK",
        code: 200,
       message:`sucsess ${email} login`,token
      });
    } catch (error) {
      next(error);
    }
}
module.exports=login