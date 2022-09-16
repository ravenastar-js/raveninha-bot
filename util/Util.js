module.exports = class Util {

    static list(arr, conj = 'e') {
		const len = arr.length;
		if (len === 0) return '';
		if (len === 1) return arr[0];
		return `${arr.slice(0, -1).join(', ')}${len > 1 ? `${len > 2 ? '' : ''} ${conj} ` : ''}${arr.slice(-1)}`;
	}
};