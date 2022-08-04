const parseToInteger = (arg: any) => {
    if (!Number.isInteger(Number(arg))) {
        return null;
    }
    return Number(arg);

}

export default parseToInteger;