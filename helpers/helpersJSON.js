function parseText(json) {
  try {
    return JSON.parse(json);
  } catch (error) {
    console.error(error);
  }
}

function stringifyText(json) {
  try {
    return JSON.stringify(json);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  parseText,
  stringifyText,
};
