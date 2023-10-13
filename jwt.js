const jwt = require("jsonwebtoken");
require("dotenv").config();

const payload = {
  id: "64b0f21e4d6562f96e85bcd5",
};

const { SECRET_KEY } = process.env;

const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
console.log(token);

const decodeToken = jwt.decode(token);
console.log(decodeToken);
