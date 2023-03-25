exports.sameContact = (arr, cont) => {
  const { email, phone } = cont;
  for (let i = 0; i < arr.length; i++) {
    if (email === arr[i].email || phone === arr[i].phone) {
      return true;
    }
  }
  return false;
};
