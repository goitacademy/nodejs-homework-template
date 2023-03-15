const ContacModel = require("./shema");

async function checkContactById(id) {
  try {
    const document = await ContacModel.findById(id).lean().exec();
    if (document) {
      return true;
    }
    return false;
  } catch (err) {
    console.error(err.message);
    return false;
  }
}

module.exports = checkContactById;
