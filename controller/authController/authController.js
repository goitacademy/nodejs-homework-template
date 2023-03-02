const UserSchema = require("../../models/userSchema");
const jwt = require("jsonwebtoken");
class AuthController {
    // const auth = (req, res, next) => {
    //     passport.authenticate('jwt', { session: false }, (err, user) => {
    //       if (!user || err) {
    //         return res.status(401).json({
    //           status: 'error',
    //           code: 401,
    //           message: 'Unauthorized',
    //           data: 'Unauthorized',
    //         })
    //       }
    //       req.user = user
    //       next()
    //     })(req, res, next)
    //   }
      
  static async login(req, res, next) {
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
      username: user.subscription,
    }
  
    const token = jwt.sign(payload, secret, { expiresIn: '1h' })
    res.status(200).json({
        status: "OK",
        token: `${token}`,
        code: 200,
        user: {
            email: "example@example.com",
            subscription: "starter",
          }
        
      });



  }
  static async registration(req, res, next) {
    const { email, subscription, password } = req.body;
    const user = await UserSchema.findOne({ email });

    if (user) {
      res.status(409).json({
        status: "error",
        code: 409,
        message: "Email in use",
        data: "Conflict",
      });
      try {
        const newUser = new UserSchema({ subscription, email });
        newUser.setPassword(password);
        const { _id: id } = await newUser.save();
        const token = jwt.sing({ id, subscription }, process.env.SECRET, {
          expiresIn: "10h",
        });
        console.log(token);
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
