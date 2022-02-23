function getField(message) {
  if (
    message.includes('phone') &&
    !message.includes('fails') &&
    !message.includes('length')
  ) {
    return 'phone';
  } else if (message.includes('name')) {
    return 'name';
  } else if (message.includes('email') && !message.includes('valid')) {
    return 'email';
  } else {
    return null;
  }
}

module.exports = { getField };
