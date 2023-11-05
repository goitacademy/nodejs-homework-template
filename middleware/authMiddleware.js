import jwt from "jsonwebtoken";

function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, "your-secret-key");
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
}

export default verifyToken;
