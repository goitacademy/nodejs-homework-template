const createNameFromEmail = (email, originalname) => {
    if (typeof email !== 'string' || typeof originalname !== 'string') {
        return originalname;
    }

    const dotIndex = originalname.indexOf('.');
    const extension = originalname.slice(dotIndex);

    const atIndex = email.indexOf('@');
    const name = email.slice(0, atIndex);

    return name + extension;
};

module.exports = createNameFromEmail;
