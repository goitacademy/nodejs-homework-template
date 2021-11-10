const phone =
  /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/;

const name = /^([A-Z][a-z]+([ ]?[a-z]?['-]?[A-Z][a-z]+)*)$/;

const password = /^[A-Z]{1}[0-9]{}/;

export { phone, name, password };
