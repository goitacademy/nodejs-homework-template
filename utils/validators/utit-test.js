module.exports = (name) => {
	if (typeof name !== 'string') return '';

	const handledUserNameArr = name
		.normalize('NFD')
		.replace(/\p{Diacritic}/gu, '')
		.toLowerCase()
		.replace(/[^a-z]/g, ' ')
		.split(' ');


	const resultArr = [];

	for (const item of handledUserNameArr) {
		if (item) resultArr.push(item.charAt(0).toUpperCase() + item.slice(1));
	}

	return resultArr.join(' ');

}