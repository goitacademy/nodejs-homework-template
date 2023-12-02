const checkForSyntax = (object) => {
  const regexName = /^[a-zA-Z ]+$/;
  const regexPhone = /^[0-9+]+$/;
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (object.name && !regexName.test(object.name))
    return { message: "please write your name right", isCorrect: false };

  if (object.phone && !regexPhone.test(object.phone))
    return {
      message: "please write your phone number right",
      isCorrect: false,
    };

  if (object.email && !regexEmail.test(object.email))
    return { message: "please write your email right", isCorrect: false };

  return { isCorrect: true };
};

module.exports = checkForSyntax;
