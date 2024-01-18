const { basedir } = global;

const { Contact } = require(`${basedir}/models/contact`);

const add = async (body) => {
  try {
    const data = await Contact.create(body);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = add;
