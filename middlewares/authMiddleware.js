const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const [tokenType, token] = req.headers["authorization"].split(' ');

  if (!token) {
    next(res.status(401).json({ message: "Not authorized" }));
  }
    
    
    try {
        const user = jwt.decode(token, process.env.JWT_SECRET); 
        req.user = user
        req.token = token  
        next();
    } catch (error) {
        next(res.status(400).json({ message: "Invalid token" }));
    }
  

  
};

module.exports = {
  authMiddleware,
};
