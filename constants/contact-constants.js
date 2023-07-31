export const emailRegexp = { minDomainSegments: 2, tlds: { allow: ['com', 'net', 'uk'] } };

export const phoneRegexp = /\+?\d{1,4}?[-.\s]?[- ]?\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;