const bcrypt = require("bcrypt");

const hasPassword = async (password) => {
  
  const result = await bcrypt.hash(password, 10);
  console.log(result);
  const passwordCompare1 = await bcrypt.compare(password, result);
  console.log(passwordCompare1);
};

hasPassword("123456");
