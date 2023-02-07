const bcrypt = require("bcrypt");

const hash = async (pass) => {
  if (!pass) throw new Error(`Pass is ${pass}`);
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(pass, salt);
};

const compare = async(pass, hashPass) => {
  return await bcrypt.compare(pass, hashPass);
}

module.exports = { hash, compare }