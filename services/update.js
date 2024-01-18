const { basedir } = global;

const { Contact } = require(`${basedir}/models/contact`);

const update = async (id, body) => {
  try {
    const data = await Contact.findByIdAndUpdate(id, body, { new: true });

    if (!data) {
      return null;
    }

    return data;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = update;
