const UserSchema = require("../../models/userSchema");
const jwt = require("jsonwebtoken");
class AuthController {

      
  static async login(req, res, next) {
    // const token = jwt.sing({ id, subscription }, process.env.SECRET, {
    //   expiresIn: "1h",
    // })
    // console.log(token);
    const { email, password } = req.body
    const user = await UserSchema.findOne({ email })
  
    if (!user || !user.validPassword(password)) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Incorrect login or password',
      })
    }
  
    const payload = {
      id: user.id,
      username: "my name is",
    }
  
    const token = jwt.sign(payload, secret, { expiresIn: '1d' })
    // console.log(token)
    const verify = jwt.verify(token, secret);

console.log(verify);
    res.status(200).json({
        status: "OK",
        data:{token} ,
        code: 200,
        user: {
            email: "example@example.com",
            subscription: "starter",
          }
        
      })
  }
  static async registration(req, res, next) {
    const { email, subscription, password,owner } = req.body;
    const user = await UserSchema.findOne({ email });

    if (user) {
      res.status(409).json({
        status: "error",
        code: 409,
        message: "Email in use",
        data: "Conflict",
      });
      try {
        const newUser = new UserSchema({ subscription, email,owner });
        newUser.setPassword(password);
       await newUser.save();
      
        res.status(201).json({
          status: "Created",
          code: 201,

          data: {
            email: "example@example.com",
            subscription: "starter",
          },
        });
      } catch (error) {
        next(error);
      }
    }
  }
}

module.exports = AuthController
