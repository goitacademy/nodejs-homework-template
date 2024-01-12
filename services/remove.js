const { basedir } = global;

const { Contact } = require(`${basedir}/models/contact`);

const remove = async (id) => {
  try {
    const data = await Contact.findByIdAndRemove(id);

    if (!data) {
      return null;
    }

    return data;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = remove;
