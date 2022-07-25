const { basedir } = global;
const Contact = require(`${basedir}/models/contact`);

const get = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

module.exports = get;
