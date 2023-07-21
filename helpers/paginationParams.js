const paginationParams = (page, limit) => {
    let normilizedPage = 1;
    let normalizerLimit = 20;
    if (!isNaN(Number(page)) && page > 0) normilizedPage = page;
    if (!isNaN(Number(limit)) && limit > 0) normalizerLimit = limit;
    return {
      skip: (normilizedPage - 1) * normalizerLimit,
      limit: normalizerLimit,
    };
}

module.exports = paginationParams;