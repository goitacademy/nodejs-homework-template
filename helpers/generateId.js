const { v4: uuidv4 } = require('uuid');

const generateId = () => {
  return uuidv4();
};

module.exports = generateId;
