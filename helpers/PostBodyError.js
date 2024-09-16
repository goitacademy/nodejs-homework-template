const PostBodyError = (errMessage) => {
  const requiredFields = ["name", "email", "phone"];
  const messageField = requiredFields.filter((field) =>
    errMessage.includes(field)
  );
  return messageField;
};

module.exports = PostBodyError;
