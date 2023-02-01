function main() {
  const arr = [1, 5, 2, 0, -2];
  for (const el of arr) {
    if (el > 1) {
      console.log('el: ', el);
      return el;
    }
  }
}

module.exports = { main };
