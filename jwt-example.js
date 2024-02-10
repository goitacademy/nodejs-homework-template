// tokeny jwt, autoryzacja
// import jwt from "jsonwebtoken";
const jwt = require("jsonwebtoken");

const payload = {
  id: "104sda9f8a0+sd",
  username: "mija",
};

const secret = "dskahf3l3h4982hgihaf4893948hfaåfhds";
const token = jwt.sign(payload, secret, { expiresIn: "1h" }); //
console.log(token);

const originalToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEwNHNkYTlmOGEwK3NkIiwidXNlcm5hbWUiOiJtaWphIiwiaWF0IjoxNzA3MzA4NjY4LCJleHAiOjE3MDczMTIyNjh9.Q202kD7gFZLyAwMOVFlxXoJspiTXUNgwhu2a2bNqCNs";

try {
  const verify = jwt.verify(originalToken, secret);
  console.log(verify);
} catch (error) {
  console.log(error);
}
