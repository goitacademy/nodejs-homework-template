const crypto = require("crypto");

// Generate a random string with the specified length
const generateRandomString = (length) => {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
};

// Generate the JWT_SECRET
const generateJwtSecret = () => {
  const length = 128; // Length of the secret in bytes
  return generateRandomString(length);
};

// Generate and log the JWT_SECRET
const jwtSecret = generateJwtSecret();
console.log(`JWT_SECRET: ${jwtSecret}`);
