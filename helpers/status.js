// return res.status(200).json({ status: "success", result });

const status = (res, number, type, object) => {
    return res.status(number).json({ type, object });
}

module.exports = {
    status
}