const UserSchema = require("../../models/userSchema");
const jwt = require("jsonwebtoken");
const validate = require("../../validator/ownValidate")
class AuthController {

      
  static async login(req, res, next) {
    // const token = jwt.sing({ id, subscription }, process.env.SECRET, {
    //   expiresIn: "1h",
    // })
    // console.log(token);
    const { email, password } = req.body
    const validateOwn=validate(req.body)
    if(!validateOwn){
      res.status(400).json({
        status: "Bad Request",
        code: 400,
        data: {message: "Ошибка валидации"},
        
      });
    const user = await UserSchema.findOne({ email })
  
    if (!user || !user.validPassword(password)) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Incorrect login or password',
        data: 'Bad request',
      })
    }
  
    const{_id: id}= user;
    
  
    const token = jwt.sign({id}, process.env.SECRET, { expiresIn: '1h' })
     console.log(token)
//     const verify = jwt.verify(token, secret);

// console.log(verify);
    res.status(200).json({
        status: "OK",
        data:{token} ,
        code: 200,
        user: {
            email: "example@example.com",
            subscription: "starter"
          }
        
      })
  }}

  static async registration(req, res, next) {
    const { email, password } = req.body;
   
   const validateOwn= validate(req.body);
    if(!validateOwn){
      res.status(400).json({
        status: "Bad Request",
        code: 400,
        data: {message: "Ошибка валидации"},
        
      });
    } 
    const user = await UserSchema.findOne({ email });
    if (user) {
      res.status(409).json({
        status: "Conflict",
        code: 409,
        data: {message: "Email in use"},
        
      });
      try {
        const newUser = new UserSchema({ email,username,subscription,owner});
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
static async logout(req, res, next) {
  try {
    const{_id:id} = req.params;
    await  UserSchema.decode(id, null);
    return res.status(404).json({
      status: "Unauthorized",
      code: 401,
      data: { message: "Not authorized"},
    });
  } catch (err) {
    next(err);
  }
}
}

}

module.exports = AuthController
