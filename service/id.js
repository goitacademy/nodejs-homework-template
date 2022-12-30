const createId = () => {
    const min = Math.ceil(1);
    const max = Math.floor(100);
    const id = Math.floor(Math.random() * (max - min)) + min;
    return id;
}

module.exports = {
    createId
}