const haveBody = (req, res, next) => {
    const { name, email, phone, } = req.body;
  
    if (!name && !email && !phone) {
      res.status(400).json({ message: "missing fields" });
    } else {
      next();
    }
  };
  
  module.exports = haveBody;