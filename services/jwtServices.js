// expiresIn -  время работы токена

const jwt = require("jsonwebtoken");

const singToken = (id) => jwt.sign({ id }, "secret", { expiresIn: "1h" });

const checkYoken = (token) => {
  if (!token) console.log("Invalid");
};
