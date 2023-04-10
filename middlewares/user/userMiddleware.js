const Users = require('../../models/user/usersSchema');
const jwt = require('jsonwebtoken');
const { users } = require("../../utils");
const {
registerDataValidator
} = users;

const checkRegisterData = async (req, res, next) => {
  try {
      
const { error, value } = registerDataValidator(req.body); 

if (error) return res.status(400).json({ message: error.details[0].message})

const userExists = await Users.exists({ email: value.email });     
if (userExists) return res.status(409).json({ message: "Email in use" });
        
    req.body = value;
    
  next();
    } catch (err) {
         next(err); 
    }
};

// 
const protect = async (req, res, next) => {
  try {

      
  const { authorization } = req.headers;
        const [bearer, token] = authorization.split(' ');
    
        if (bearer !== "Bearer") return res.status(401).json({ message: "Not authorized" });

        if (!token) return res.status(401).json({ message: "Not authorized" });

 let decodedToken;

try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.log(err.message);

    return res.status(401).json({ message: "Not authorized" });
  }
  
    const user = await Users.findById(decodedToken.id);

    if (!user) return res.status(401).json({ message: "Not authorized"});

  req.user = user;

  next();
} catch (error) {
  next(error);
}
};


module.exports = { checkRegisterData, protect };




// const protect = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.startsWith('Bearer') && req.headers.authorization.split(' ')[1];

//   if (!token) return res.status(401).json({ message: "Not authorized" });

//   let decoded;

//   try {
//     decoded = jwt.verify(token, process.env.JWT_SECRET);
//   } catch (err) {
//     console.log(err.message);

//     return res.status(401).json({ message: "Not authorized"});
//   }

//   const currentUser = await Users.findById(decoded.id);

//   if (!currentUser) return res.status(401).json({ message: "Not authorized"});

//   req.user = currentUser;

//   next();
//   } catch (error) {
//     next(error);
//   }
// };

